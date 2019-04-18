
- [Zumza](#zumza)
- [Starting off:](#starting-off)
	- [Starting your Farm business:](#starting-your-farm-business)
	- [Starting your Factory business:](#starting-your-factory-business)
	- [Starting your Shop business:](#starting-your-shop-business)
- [The Market:](#the-market)
- [Command List](#command-list)

[cmdTOC]: <> (Addition Table of Contents for Commands)

# Zumza
You start your business as Enterpreneur who will slowly grow and get more employees for his business, start off by selecting your:
 
 - Business name
 - Business type
 - Business location

# Starting off:
## Starting your Farm business:
Start off by buying some crops like potatos by doing `?buy potato 10` you first might need to get some money from your bank with `?withdraw 50` after you got your potatoes lets plant them: `?plant potato 10` then you can do `?farm` and check their process.
After some time they are finished and you can do `?harvest` and go home with your freshly harvested potatoes.
## Starting your Factory business:
Lets see what we can produce by doing `?factory`, a good start is popcorn so lets get `2 corn`, we can not do `?buy corn 2` as you can only buy `corn_seeds`, so we want to search the market with `?viewmarket corn`, and as it looks here are some offers so lets `?buymarket <id>` and there we go we now have 10 corn so we want to start by doing `?produce popcorn 5`, with `?factory` we can check the current status of our items, when we see they are finished we can do `?collect` to get our freshly produced popcorn.
## Starting your Shop business:
This might be coming soon, if you have any suggestions or other Types we could implement, we would be happy if you let us know!
# The Market:
When you need some cheap stocks it might be cheaper to just check the market ( `?viewmarket` ) and if you find something buy it ( `?buymarket <id>` ), when you see there is a need for specific items why not use `?sellmarket <amount> <item> <price>` to create your own offer.

# Command List
<run ?help>