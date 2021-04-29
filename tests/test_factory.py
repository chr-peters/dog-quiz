import os

from dog_quiz import create_app


def test_create_app():
    # test with config from class
    class TestConfig:
        SECRET_KEY = "something-secret"

    app = create_app(TestConfig)

    assert app.secret_key == "something-secret"

    # test with config from env vars
    os.environ["SECRET_KEY"] = "another-secret"

    app = create_app()

    assert app.secret_key == "another-secret"
