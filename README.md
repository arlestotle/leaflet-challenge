# Module 15 - leaflet-challenge

### The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

## Create the Earthquake Visualization
#### 
1. Get dataset. The USGS provides earthquake data in a number of different formats, updated every 5 minutes. For the challenge, I chose to use the "All Earthquales from the Past 7 Days".
2. Import and visualize the data by doing the following: 
- Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
    - Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
    - Hint: The depth of the earth can be found as the third coordinate for each earthquake.
- Include popups that provide additional information about the earthquake when its associated marker is clicked. I chose to include the place, lat and lng coordinates, magnitude, depth, and significance of each earthquake. 
- Create a legend that will provide context for your map data.

### Outside Help
#### For this assignment, I used outside sources such as Stack Overflow, ChatGPT, Classmates.
##### The USGS website is updated every 5 minutes so every map will look a little different. The last time the code was run was on 2/11/2024.
#### From Google: HEX color codes -> 
    bright_green: '#14F353', light_green: '#9DFA85', yellow_orange: '#F7E54A', orange: '#F7C64A', orange_red: '#F79436', red: '#FA3D0F'
#### From ChaptGPT: Function to determine the color of marker based on the depth of the earthquake. 
    1. function getColor(depth) {
    switch (true) {case depth > 90: 
    return '#FA3D0F';}}
#### From ChaptGPT: Creating the legend for the leaflet map. 'div.innerHTML +=...' looks inside the loop and dynamicallt appends HTML content to the innerHTML property of the div element. '<i style="background: ' + getColor(grades[i] + 1) + '"></i>' Generates an  HTML element with a background color determined by the getColor function. 'grades[i]' Adds the current value from the grades array to the legend. '(grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+')' Adds a dash and the next value from the grades array (grades[i + 1]) followed by a line break (<br>) if the next value exists. Otherwise, it appends a plus sign (+). 
    for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background: ' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');}
        return div;
#### From ChaptGPT/Google: In order to create the legend you need to edit the style.css file.
 '.legend{}' Is the class sector, it selects the HTML elements htat have the class attribute set to 'legend'. 'background: rgba(250, 250, 250, .6);' makes the background of the legend white and alters the opacity.'.legend i {}' is specifying CSS styles for all <i> elements that are descendants of elements with the class .legend.
         .legend {
          line-height: 25px;
          color: #000000;
          background: rgba(250, 250, 250, .6);
          box-shadow: 0 0 0 1px rgb(0, 0, 0, .8);
          padding: 10px;
          border-radius: 5px;
        }
        .legend i {
          width: 20px;
          height: 20px;
          float: left;
          margin-right: 12px;
          opacity: 0.7;
          box-shadow: 0 0 0 1px rgb(0, 0, 0, .8);
        }


