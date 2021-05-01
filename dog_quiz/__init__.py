from flask import Flask

from . import api_endpoints
from .config import get_config_from_env_vars


def create_app(config=None):
    app = Flask(__name__, static_folder=None)

    if config is None:
        config = get_config_from_env_vars()

    app.config.from_object(config)

    app.add_url_rule(
        "/api/get-quiz",
        endpoint="get_quiz",
        view_func=api_endpoints.get_quiz,
        methods=["GET"],
    )

    return app
