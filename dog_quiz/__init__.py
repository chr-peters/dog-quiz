from flask import Flask

from .config import get_config_from_env_vars


def create_app(config=None):
    app = Flask(__name__, static_folder=None)

    if config is None:
        config = get_config_from_env_vars()

    app.config.from_object(config)

    return app
