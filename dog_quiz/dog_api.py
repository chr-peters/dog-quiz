from dataclasses import dataclass
from urllib.parse import urljoin

import requests

DOG_API_BASE_URL = "https://api.thedogapi.com/v1/"


@dataclass(eq=True, frozen=True)
class Breed:
    name: str
    img_url: str


class DogAPIConnector:
    def __init__(self, API_KEY):
        self.API_KEY = API_KEY

    def get_all_breeds(self):
        """
        Lists all dog breeds.

        Returns
        -------
        breeds : List[Breed]
            A list of Breed objects.
        """
        headers = {"x-api-key": self.API_KEY}
        breeds = _make_request("breeds", method="GET", headers=headers)

        result = [
            Breed(name=cur_breed["name"], img_url=cur_breed["image"]["url"])
            for cur_breed in breeds
        ]

        return result


def _make_request(endpoint: str, method: str, headers: dict = None, data: dict = None):
    url = urljoin(DOG_API_BASE_URL, endpoint)

    if method.upper() == "GET":
        request_function = requests.get
    else:
        raise ValueError(f"Method {method} not supported!")

    response = request_function(url, headers=headers, data=data)
    response.raise_for_status()

    return response.json()
