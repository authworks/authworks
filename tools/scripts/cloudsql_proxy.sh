#!/usr/bin/env bash

INSTANCE_CONNECTION_NAME=stuff-9356490050:australia-southeast1:content-service-sandbox
BOUND_PORT=5432
SERVICE_ACCOUNT_PATH=${PWD}/tools/secrets/developers_sa_key.json

cloud_sql_proxy -instances=${INSTANCE_CONNECTION_NAME}=tcp:${BOUND_PORT} \
                -credential_file=${SERVICE_ACCOUNT_PATH}
