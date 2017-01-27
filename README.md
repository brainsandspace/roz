# Roz
*always watching*

# Notes to self
I have got the basics working. Maybe not the best architecture, but things are working. Here's the current flow:
- "server" (which I should rename to just roz) watches a folder of your choosing, which you currently set in the file but I should extract that and make it an argument you pass in. From terminal,

  `npm run start-server`
  
- in the client folder, (which again I should rename to like display or something), we are running webpack-dev-server since it basically has sockets built in (confirm this). By passing in the host option of 0.0.0.0 to webpack-dev-server, we expose our local IP and so we can view the output from any device on the same network (aka my iPad, which was the goal). From another terminal,

  `npm run start-client`

## TODO
**among many others**
- [ ] parse roz_well.txt
- [ ]d3 integration for all kinds of visualization
- [ ] see what other stats chokidar might provide
- [ ] search for require and import statements to build dependency graph
- [ ] package everything up into an npm package, probably
  - possibly a VS Code extension, but probably not
- [ ] sleep