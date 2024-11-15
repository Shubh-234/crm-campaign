# Step1: Project setup 
client folder for the frontend which contains the react application and server for the backend

created a new cluster in mongodb atlas and connected the cluster to my application using the authentication string

# Step 2: Set Up Database and Define Models
design of database schemas:- Customer,Order,AudienceSegment,Campaign,CommunicationLog

# Step3: Creation of data ingestion apis
created post and get routes for customers and orders separately and included them in the main server.js file 

# Step 4: created pub/sub for the customers using redis
pub sub is way of handling data such that when we create a new costumer and send a post request to api/customers/add the data is sent to/or published to be more accurate to a channel we created named customerChannel
this channel takes care of the data validation there 

so till now our data is validated but not stored
When this channel receives a message, it processes the message as customer data and, if certain conditions are met, saves the data in MongoDB.

Why publisher-subscriber architecture is used?
In a traditional API approach, one service (e.g., a client or frontend) directly interacts with the database by sending requests to an API, which then saves the data in MongoDB. This creates a tight coupling between the components (client, API, database).
Using Redis pub-sub allows you to decouple the services. The publisher only needs to publish messages to Redis without knowing what other services will do with that data. The subscribers (e.g., the MongoDB saver service) listen for relevant messages and handle them independently.
This decoupling improves scalability because the publisher doesn’t need to directly interact with multiple services or databases, so you can add more subscribers without impacting the publisher.|

By using Redis pub-sub:
You gain decoupling of components for easier scalability and maintenance.
Achieve real-time responsiveness for fast message delivery.(because redis is fast and operates in memory)
Reduce load on the main API and handle asynchronous processing more effectively.
Have flexibility in adding new subscribers or processing tasks without changing the core code.
It fits well with an event-driven approach, making it easier to expand functionality over time.

# Step5: Tested the customer and order data ingestion apis on postman 

checked the api functionalities by sending post request to api/customers/add

after then sent a get request to the same port to check if the channel we created in the pub sub model has added the data in the mongo db data base or not

Similary followed the same steps for orders

# Step6: created audience segments based on conditions

created a function buildQuery in utils which  dynamically constructs MongoDB query objects based on specified conditions and logical operators (AND/OR). It is likely part of a backend service that queries a MongoDB database with specific filters.
used this function to group customers into audience with the given conditions(customers who have 10,000> spending,customers who have not visited in the last month etc)

tested this api on postman,successfully receiving the json response of the segment size(number of valid customers in that segment) along with the customer list

# step7: campaign creation 

created api to assign campaigns to certain audience segment,the request recieves a header(name of the campaign),the message and the audience segment id to which the campaign is assigned
each campaign has a campaign id saved in the mongo db database as well
also created a get request to retrieve the list of all campaigns sorted in descending order

# step8: sending messages api

now we have the campaigns created and audience segment,we have to send dummy messages to that audience (meaning all the customers in that audience segment should recieve the dummy message)

<!-- const campaign = await Campaign.findById(new mongoose.Types.ObjectId(campaignId)).populate('audienceSegmentId');
        console.log("Found campaign:", campaign);

        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found." });
        }

        const query = buildQuery(campaign.audienceSegmentId.conditions, campaign.audienceSegmentId.logic);
        const customers = await Customer.find(query); -->

we use the campaign id associated with the campaign and use our query builder to group the audience to find the list of customers whom we need to send the messagee to
we use communication log array which stores the list of all messages to be sent to respective customers,then insert it to the communication log table

# step8: delivery receipts

each message has a status(sent or failed)
each entry in our communication contains the details of every message sent/recieved from our customers
we upate our delivery receipts(details on whether the message is sent or not by creating a put request)

# step9: using pub sub for batch updates

created a pub sub architecture using redis to update our delivery receipts in batches 
hen the Delivery Receipt API is called for each message, instead of immediately updating the CommunicationLog in the database, we publish a message with the details (e.g., logId, status as SENT or FAILED) to a message broker.(redis in our case)
We create a subscriber service(named deliveryRecieptChannel in our case) that listens for these published messages from the broker.
The subscriber collects these messages over a set time interval or until it reaches a certain batch size.




