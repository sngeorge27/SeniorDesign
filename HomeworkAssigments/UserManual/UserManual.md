# User Manual

## Running Locally

Our application runs in a local development environment and uses the browser's local storage to store user information due to the limitations of needing to run offline for our expo presentation. In order to use our application, you need to have the front end and back end running in parallel.

**Steps to Run the Front End:**

1. `cd frontend`
2. `npm install` _(Only need to execute on first run, installs nodejs packages)_
3. `npm run dev`

**Steps to Run the Back End:**

1. `pip install -r sabrosa_backend/requirements.txt --upgrade` _(Only need to execute on first run, installs python packages)_
2. `pip install -e sabrosa_backend` _(Only need to execute on first run, creates backend package)_
3. `python sabrosa_backend/sabrosa_backend/app.py`

## Creating an Account

To create an account, click the "Register" link on bottom left of the login page that will direct you to the sign up page. Enter in your personal information which will be used to calculate your nutrition goals specific to your biometric data.

![Sign Up Page](https://github.com/sngeorge27/SeniorDesign/blob/main/HomeworkAssigments/UIDesignSpecification/SignUp.png)

## Recommendations

Our application gives users recommendations on food items to eat based on the nutrients they are lacking for the current day, which is calculated from the foods they have logged already and their nutrition goals. We pull the top 30 results from our database and provide the main nutrients that caused us to recommend that food. We only display a few food recommendations at a time and refreshing the page will cycle through more of the food results in case you aren't interested in any of the foods it is recommending.

![Recommendation Page](https://github.com/sngeorge27/SeniorDesign/blob/main/HomeworkAssigments/UIDesignSpecification/Recommendations.png)

## Food Log

Our food log is where you are able to track what foods you have eaten throughout a given day and see your total nutrient intake progress towards your goals.

![Food Log Page](https://github.com/sngeorge27/SeniorDesign/blob/main/HomeworkAssigments/UIDesignSpecification/TrackFood.png)

### Adding to Log

To add a new food to the log, click on the "Add Food" button at the top right of the log, and it will bring up a dialog. Search the food that you would like to add and click on the food item to select it. You will then be prompted to enter the amount of the food you would like to add to your log. Finally, hit the "Add" button to add the food to the log, and it will reflect your change in the nutrients section. If you decide you want to add a different food while in the Add Food dialog, hit the "X" button next to the search bar, and search again for your desired food item.

![Add Food Dialog](https://github.com/sngeorge27/SeniorDesign/blob/main/HomeworkAssigments/UIDesignSpecification/AddFoodSearch.png)

### Adding Recommendation to Log

If instead you would like to add one of the recommended foods from the recommendations page, hit the "+" button next to the desired food item and enter in the amount you would like to log. Hitting the "Add" button will add the recommended item to your food log and redirect you to the food log page.

![Add Recommendation Dialog](https://github.com/sngeorge27/SeniorDesign/blob/main/HomeworkAssigments/UIDesignSpecification/AddRecommendation.png)

### View Nutrients from a Specific Food

If you would like to view the nutrients for a specific food in the food log, click on the food item in the food log and it will show only the nutrients for the selected item. If you wish to view the nutrients for the whole log again, click the selected item again and it will deselect it.

![Selected Food](https://github.com/sngeorge27/SeniorDesign/blob/main/HomeworkAssigments/UIDesignSpecification/SelectedFood.png)

### View RDI Values in Log

To view the RDI values for each nutrient from the food log instead of navigating to the Goals page, toggle the "Show RDI?" checkbox. To show a more comprehensive view of the RDI values, view the Goals page.

![RDI Values](https://github.com/sngeorge27/SeniorDesign/blob/main/HomeworkAssigments/UIDesignSpecification/ShowRDI.png)

### Deleting Food from Log

To delete an item from the food log, hit the "X" button next to the item.

### Navigate to Different Dates in Log

To navigate between food logs on different dates, use the "<" and ">" buttons. Hitting the "Today" button will bring you back to the current date.

## View Goals

To view all of your nutrient goals in one place, grouped by category, navigate to the Goals page.

![Goals Page](https://github.com/sngeorge27/SeniorDesign/blob/main/HomeworkAssigments/UIDesignSpecification/Goals.png)

## Edit Profile Data

If any of your personal data changes, you can edit these on the Profile page.

![Profile Page](https://github.com/sngeorge27/SeniorDesign/blob/main/HomeworkAssigments/UIDesignSpecification/Profile.png)
