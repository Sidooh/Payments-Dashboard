export const DevelopmentConfig = {
    "sidooh": {
        "services": {
            "accounts": {
                "api": {
                    "url": "http://localhost:8000/api/v1"
                }
            },
            "notify": {
                "api": {
                    "url": "http://localhost:8003/api/v1"
                },
                "dashboard": {
                    "url": "http://localhost:3000"
                }
            },
            "legacy": {
                "dashboard": {
                    "url": "http://127.0.0.1:8080/admin"
                }
            }
        }
    }
};