this is a bot that makes a request on the myanimelist website and filters the rank of animes, 
as this data is updated only twice a day, after a request, the data is saved inside redis for 6 hours.
The usability is very simple, you only need to call bot passing 
   
/anime_rank <rank options> <total positions (default: 10) (limit: 50)>

the rank options will be available as soon as the bot is finished, but if you enter in the file /services/filteringContent.js, there are all possible commands.

![usage example](/src/example.png)
