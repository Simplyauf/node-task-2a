# This project is a toy project for training and quality assurance purposes

# node_task

1. Clone repo into your github
2. Create a page on route / that match the figma file https://www.figma.com/file/wDRDYmVG1qZI3qff32631b/Untitled?node-id=0%3A1
3. Call the weather api https://www.weatherapi.com/pricing.aspx to show the temperature in celsius and draw a sun if sunny. If its raining show clouds (choose an image from google). If its snowing, choose a snowflake image from google. This widget should update every 5 minute calling teh weather api. Call weather api from backend route. Do error handling.
4. Given the current UTC time, create 4 time widget where you convert the UTC time to local time of london, EST, Nigeria and Pakistan time. Every second, the time should be updated like regular clock. Create backend route to return the time.
5. Create a widget that call autocomplete api /airports?search= that dropdown the airports that match the search terms partially. Minimum number of character to trigger autocomplete is 3. Create backend route to handle this.
6. Show map widget for airport chosen using latitude and longitude from autocomplete chosen airport. Use this map api https://openlayers.org/doc/quickstart.html
7. Create a widget that calculate the distance from artic circle to airport https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula

8. Use tailwindcss for ui

9. Create db table called analytic (id, create_at, widget_name, browser_type, ). Everytime user clicks on a widget, call api /analytic and send the widget name to log it in the db.

10. Number of Click widget call an api every minute that count the # of rows in analytic.

11. Create widget export xml that will export the analytic database as xml file. Create backend route to handle this.

    (b) add route to import the analytic xml file.

12. Query https://www.reddit.com/r/programming.json and create a reddit widget where we show the top 4 even post as cards in the widget (title, link, who posted it). Create backend route to handle this.

13. Count # of coin widget. Once user type in a money amount, and click calculate, we show how many bills to add up to the money amount. The bills allowed are: $20 bill, $10 bill, $5 bill, $1 bill, $25 cent, $10 cent, $5 cent, $1 cent. Create backend route to handle this.

14. Rate limit analytic api to only be able to be called 10 times a minute.

15. If the rate limit is exceeded, redirect to a page that requires user to pay for the service ($5) with stripe.  Free to use stripe checkout or payment element.

15. Create upload widget where we upload image to server. Save image to db table. Always show the latest image uploaded above upload button.

16. Read this documentation https://www.npmjs.com/package/speakeasy and implement a modal popup that blocks the dashboard. Unless 2FA is verified, cannot see dashboard.

17. Implement a single long polling chat. Here's a document explaining it

https://www.enjoyalgorithms.com/blog/long-polling-in-system-design

https://javascript.info/long-polling

https://www.technouz.com/4879/long-polling-explained-with-an-example/

Redis:

https://redis.io/docs/connect/clients/nodejs/

https://www.npmjs.com/package/redis

In demo what should happen:
If I open 2 browsers to /chat, both users should connect to chat room. Use redis to store state of chatroom.
Have basic html ui showing the chat log using UL and single input box with send button to send messages.
When I type a message in send message, call /send POST api to send message to backend. The chat room is updated with new message.
All client browsers have an api called /poll that check if chat room on redis is updated. If updated, it will return 200 and frontend
need to call GET /chat/all to pull all the messages in chat room which you will update the UL. Have a button called save where it will save the current chat room chat messages to database table chat with fields (id, create_at, chat_messages).


Stripe key:

pk_test_51IWQUwH8oljXErmdg6L4MhsuB6tDdmumlHFfyNaopty2U27pmRcqMX1c868zn838lGQtU1eYV6bKRSQtMFWf36VT00aNsvnTOE

sk_test_51IWQUwH8oljXErmds28KftkL6o6jYIcPgYbBdfEmCPSuAlIh0fgoS4NADcCmsIZbdQ3p5nbAeCOcGkSmo38U9BIe00BdOenrqo