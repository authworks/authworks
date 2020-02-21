# Authworks

Authworks is an AaaS (Auth as a Service) which speeds up the development of hosted 
OAuth server and/or OIDC identity provider. We provide a central cloud service as a solid backyard
to do the dirty work e.g., handle protocols and authorisation flows, your server just needs to 
implement a breeze light part as the authorization server front door.

Authworks includes these components:
- `Authworks API`: REST API to handle the OAuth/OIDC requests, whichs is the major part for your OAuth/OIDC 
server to interact with, most of the time you just need to forward the requests in well-known authorization endpoints from your clients to our
API.
- `Authworks Webconsole`: a web UI you can configure your projects and your clients.
- `Authworks SDK`: SDK with a variety of language bindings to simplify your integration with our API. It
is more of a wrapper of Authworks API and it is optional to use it: you can use Authworks API directly if 
that is straight-forward enough.

