import json
from pathlib import Path

import pytest
import responses
from flask.testing import FlaskClient

from dog_quiz.dog_api import Breed, DogAPIConnector


@pytest.fixture
def breeds_response_json():
    f = open(Path(__file__).parent / "breeds_response.json", mode="r")
    yield json.load(f)
    f.close()


@responses.activate
def test_get_quiz(client: FlaskClient, breeds_response_json):
    responses.add(
        responses.GET, "https://api.thedogapi.com/v1/breeds", json=breeds_response_json
    )
    response = client.get("/api/get-quiz")

    assert response.status_code == 200


@responses.activate
def test_list_breeds(breeds_response_json):
    responses.add(
        responses.GET, "https://api.thedogapi.com/v1/breeds", json=breeds_response_json
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
