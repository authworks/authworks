#!/usr/bin/env bash

tools/liquibase/liquibase --driver=org.postgresql.Driver \
                          --changeLogFile=tools/migration/changelog.xml \
                          --url=jdbc:postgresql://localhost:5432/${USER/./-}-authworks \
                          --username=postgres \
                          --password=postgres \
                          --logLevel=sql \
                          update
