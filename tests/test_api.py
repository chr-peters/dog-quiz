import json
from pathlib import Path

import pytest
import responses
from flask.testing import FlaskClient

from dog_quiz.dog_api import Breed, DogAPIConnector


@pytest.fixture
def breeds_response():
    f = open(Path(__file__).parent / "breeds_response.json", mode="r")
    raw_breed_list = json.load(f)
    f.close()
    return raw_breed_list


@pytest.fixture
def breeds_response_long():
    """
    The file contains four different breeds. One breed is duplicated to fill the
    required 10 breeds.
    """
    f = open(Path(__file__).parent / "breeds_response_long.json", mode="r")
    raw_breed_list = json.load(f)
    f.close()

    for i in range(10 - len(raw_breed_list)):
        raw_breed_list.append(raw_breed_list[0])
    return raw_breed_list


@responses.activate
def test_get_quiz(client: FlaskClient, breeds_response_long):
    responses.add(
        responses.GET, "https://api.thedogapi.com/v1/breeds", json=breeds_response_long
    )
    response = client.get("/api/get-quiz")

    assert response.status_code == 200

    response_list = response.json
    assert len(response_list) == 10

    test_names = [
        "Affenpinscher",
        "Afghan Hound",
        "African Hunting Dog",
        "Airedale Terrier",
    ]

    for cur_quiz_question in response_list:
        assert cur_quiz_question["true_answer"] in test_names
        assert len(cur_quiz_question["wrong_answers"]) == 3
        assert set(cur_quiz_question["wrong_answers"]) == set(test_names) - {
            cur_quiz_question["true_answer"]
        }
        assert cur_quiz_question["img_url"].startswith("https://")


@responses.activate
def test_list_breeds(breeds_response):
    responses.add(
        responses.GET, "https://api.thedogapi.com/v1/breeds", json=breeds_response
    )

    api_connector = DogAPIConnector(API_KEY="some-key")
    breeds = api_connector.get_all_breeds()

    assert set(breeds) == {
        Breed(
            name="Afghan Hound",
            img_url="https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg",
        ),
        Breed(
            name="Affenpinscher",
            img_url="https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
        ),
    }
