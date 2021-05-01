import random
from json.decoder import JSONDecodeError

from flask import current_app, json
from requests.exceptions import HTTPError

from .dog_api import DogAPIConnector


def get_quiz():
    api_connector = DogAPIConnector(API_KEY=current_app.config["DOG_API_KEY"])

    try:
        breeds = api_connector.get_all_breeds()
    except (HTTPError, JSONDecodeError):
        response = json.jsonify({"message": "Could not fetch breeds!"})
        response.status_code = 503
        return response

    try:
        chosen_breeds = random.sample(breeds, k=10)
    except ValueError:
        response = json.jsonify({"message": "Could not fetch breeds!"})
        response.status_code = 503
        return response

    names = {cur_breed.name for cur_breed in breeds}

    quiz = [
        {
            "id": i,
            "true_answer": cur_breed.name,
            "wrong_answers": random.sample(list(names - {cur_breed.name}), k=3),
            "img_url": cur_breed.img_url,
        }
        for i, cur_breed in enumerate(chosen_breeds)
    ]

    return json.jsonify(quiz)
