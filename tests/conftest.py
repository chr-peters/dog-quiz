import pytest
from dog_quiz import create_app


@pytest.fixture
def client():
    class TestConfig:
        SECRET_KEY = "something-secret"
        DOG_API_KEY = "some-key"
        TESTING = True

    app = create_app(TestConfig)

    return app.test_client()
