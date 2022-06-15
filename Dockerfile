FROM lambci/lambda:nodejs12.x

FROM lambci/lambda-base-2:build

ENV PATH=/var/lang/bin:$PATH \
  LD_LIBRARY_PATH=/var/lang/lib:$LD_LIBRARY_PATH \
  AWS_EXECUTION_ENV=AWS_Lambda_nodejs12.x \
  NODE_PATH=/opt/nodejs/node12/node_modules:/opt/nodejs/node_modules:/var/runtime/node_modules

COPY --from=0 /var/runtime /var/runtime
COPY --from=0 /var/lang /var/lang
COPY --from=0 /var/rapid /var/rapid

COPY ssh /root/.ssh
RUN chmod -R 600 /root/.ssh
COPY --chown=node:node . .

RUN npm install -g yarn
# Add these as a separate layer as they get updated frequently
RUN pipx install awscli==1.* && \
  pipx install aws-lambda-builders==1.2.0 && \
  pipx install aws-sam-cli==1.15.0

# docker run --network host -e NODE_ENV='development' --rm -v "$PWD":/var/task lambci/lambda:nodejs12.x index.handler '{"html":"<b>Hello</>"}'