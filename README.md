
- [Zumza](#zumza)
- [Starting off:](#starting-off)
	- [Starting your Farm business:](#starting-your-farm-business)
	- [Starting your Factory business:](#starting-your-factory-business)
	- [Starting your Shop business:](#starting-your-shop-business)
- [The Market:](#the-market)
- [Command List](#command-list)
	- [Command: deposit](#command-deposit)
	- [Command: withdraw](#command-withdraw)
	- [Command: report-bug](#command-report-bug)
	- [Command: suggest](#command-suggest)
	- [Command: buy](#command-buy)
	- [Command: farm](#command-farm)
	- [Command: harvest](#command-harvest)
	- [Command: leaderboard](#command-leaderboard)
	- [Command: plant](#command-plant)
	- [Command: stats](#command-stats)
	- [Command: buymarket](#command-buymarket)
	- [Command: collect](#command-collect)
	- [Command: fabricate](#command-fabricate)
	- [Command: factory](#command-factory)
	- [Command: marketinfo](#command-marketinfo)
	- [Command: mymarket](#command-mymarket)
	- [Command: removemarket](#command-removemarket)
	- [Command: sellmarket](#command-sellmarket)
	- [Command: viewmarket](#command-viewmarket)
	- [Command: breset](#command-breset)
	- [Command: getrole](#command-getrole)
	- [Command: botinfo](#command-botinfo)
	- [Command: help](#command-help)
	- [Command: indevelopment](#command-indevelopment)
	- [Command: ping](#command-ping)

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
## Command: deposit
    Category: banking
    Description: Used to deposit Money to your Bank!
    Usage: ?deposit <amount>
    Aliases: [ dep, d ]

## Command: withdraw
    Category: banking
    Usage: ?withdraw <amount>
    Aliases: [ wd, with ]

## Command: report-bug
    Category: botmanagement
    Usage: ?report-bug <info>
    Aliases: [ bug-report, bug ]

## Command: suggest
    Category: botmanagement
    Usage: ?suggest <info>

## Command: buy
    Category: business
    Usage: ?buy <item> <amount>

## Command: farm
    Category: business
    Usage: ?farm
    Aliases: [ crops ]

## Command: harvest
    Category: business

## Command: leaderboard
    Category: business
    Usage: ?leaderboard

## Command: plant
    Category: business
    Usage: ?plant <crop> <amount>

## Command: stats
    Category: business
    Description: Check your or anothers Entrepreneurs business stats!
    Usage: ?stats or ?stats @Zumza 
    Aliases: [ statistics ]

## Command: buymarket
    Category: indevelopment
    Usage: ?buymarket <name>

## Command: collect
    Category: indevelopment

## Command: fabricate
    Category: indevelopment
    Usage: ?fabricate <product> <amount>
    Aliases: [ produce ]

## Command: factory
    Category: indevelopment
    Usage: ?factory

## Command: marketinfo
    Category: indevelopment
    Usage: ?marketinfo <id>

## Command: mymarket
    Category: indevelopment
    Usage: ?mymarket

## Command: removemarket
    Category: indevelopment
    Usage: ?removemarket <id>

## Command: sellmarket
    Category: indevelopment
    Usage: ?sellmarket <amount> <item> <price>

## Command: viewmarket
    Category: indevelopment
    Usage: ?viewmarket <name>

## Command: breset
    Category: setup

## Command: getrole
    Category: setup
    Usage: ?getrole

## Command: botinfo
    Category: utility
    Description: Shows you the Bot Info
    Usage: ?botinfo
    Aliases: [ info, bot, client, clientinfo ]

## Command: help
    Category: utility
    Description: Shows all the ## Commands
    Usage: ?help or ?help <## Command||category>

## Command: indevelopment
    Category: utility
    Description: Show info abaut the Bot's current status
    Usage: ?indevelopment
    Aliases: [ indev, development ]

## Command: ping
    Category: utility
    Description: Shows bot latency
    Usage: ?ping
    Aliases: [ pong ]