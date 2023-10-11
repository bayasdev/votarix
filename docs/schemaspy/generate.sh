#!/bin/bash

docker run --rm -v "./output:/output" -v "./config.properties:/schemaspy.properties" schemaspy/schemaspy:latest
