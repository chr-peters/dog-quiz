from pathlib import Path

from flask import Flask
from whitenoise import WhiteNoise

from . import api_endpoints
from .config import get_config_from_env_vars

# the react frontend is located here
FRONTEND_DIR = Path(__file__).parent.parent / "frontend" / "build"


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

    # serve the frontend using whitenoise
    app.wsgi_app = WhiteNoise(app.wsgi_app, root=FRONTEND_DIR, index_file=True)

    return app
