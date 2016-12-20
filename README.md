
DESCRIPTION
===========
A quick script to allocate gifters and giftees from a group of people, and then send them emails using the Gmail API.


SETUP
=====

I. Follow steps below to setup Gmail API 
----------------------------------------

(full details in link: https://developers.google.com/gmail/api/quickstart/nodejs) 

### Prerequisites

To run this quickstart, you'll need:
* Node.js installed.
* The npm package management tool (comes with Node.js).
* Access to the internet and a web browser.
* A Google account with Gmail enabled.
    
### Step 1: Turn on the Gmail API

* Go to: https://console.developers.google.com/flows/enableapi?apiid=gmail
to create or select a project in the Google Developers Console and automatically turn on the API. Click Continue, then Go to credentials.

* On the Add credentials to your project page, click the Cancel button.

* At the top of the page, select the OAuth consent screen tab. Select an Email address, enter a Product name if not already set, and click the Save button.

* Select the Credentials tab, click the Create credentials button and select OAuth client ID.

* Select the application type Other, enter the name "Gmail API Quickstart", and click the Create button.

* Click OK to dismiss the resulting dialog.

* Click the file_download (Download JSON) button to the right of the client ID.

* Move this file to your working directory and rename it client_secret.json.
    

### Step 2: Install the client library

Run the following commands to install the libraries using npm:

        $ npm install googleapis --save
        $ npm install google-auth-library --save


### Step 3: Run the Sample

Run the sample using the following command:

        $ node quickstart.js

NOTE: 
We have modified the scope from 'readonly' to 'send' in this example.  If you have used the exact example from the Gmail API setup page, you will need to delete your previously saved credentials and get new ones, at ~/.credentials/gmail-nodejs-quickstart.json

The first time you run the sample, it will prompt you to authorize access:

* Browse to the provided URL in your web browser.

* If you are not already logged into your Google account, you will be prompted to log in. If you are logged into multiple Google accounts, you will be asked to select one account to use for the authorization.
    
* Click the Accept button.
    
* Copy the code you're given, paste it into the command-line prompt, and press Enter.


II. Open secretsanta.js file and make below adjustments 
----------------------------------------------------------------

*   Add all names and email addresses for people included in the Secret Santa / Kris Kringle in the 'partipants' array (from line 29)

    NOTE:
    If have more or less than 6 people, you will need to remove / add lines for each person.  

*   Add your email address to the 'fromEmail' variable.  The program generates the emails and recipients will recieve emails that appear to be from you.

    NOTE: 
    These emails will appear in your sent email box.  

*   Add suggested spending limit for gift purchase to the 'limit' variable.  
        - This will be added to the email text to suggest a maximum price participants should spend when buying gifts.

*   Adjust makeMessage function if desired.  
        - This is the email message that will be sent to participants. 

ADDITIONAL INFORMATION
======================

*   Please note: regarding the algorithm used for the Secret Santa random distribution, it is limited to one giant loop through the participants.  Therefore if you are giving a gift to person1, you will know that person1 will not be purchasing a gift for you. 

*   The console will print 'Done!' for each successfully sent email.  You should check that you get this message the same number of times as there are participants.  Error messages will appear instead of the 'Done!' message, if an error occurs. 

*   There is a 10 second delay between each email.  This is to avoid hitting the limits set by the Gmail API. 

*   Merry Christmas.

