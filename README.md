# Meet Auto-Quit Extension (CS50 Final Project)

A Google Chrome extension that automatically leaves a Google Meet call based on user-defined quorum settings.

#### Video Demo: https://youtu.be/_MUDpNNqNlg

---

## Detailed Description

### The Problem
In long online meetings or classes, it's common for participants to leave gradually. Staying on the call when most have already left can be unproductive or unnecessary. The process of constantly monitoring the number of people to decide if it's time to leave is a manual task that distracts the user from the main focus of the meeting.

### The Solution
The **Meet Auto-Quit Extension** solves this problem by automating the process of leaving the call. The extension monitors the number of participants and, when this number drops below a percentage of the peak attendance (both configurable by the user), it automatically closes the call. This allows the user to focus on the meeting, with the peace of mind that they won't be left "alone" in the virtual room without realizing it.

---

## Key Features

* **Automatic Monitoring**: The extension checks the number of participants every second.
* **Floating Control Panel**: A simple and non-intrusive user interface is added to the Google Meet page, allowing full control over the extension.
* **Real-time Customizable Settings**: The user can define two main parameters directly in the panel:
    1.  **Activate with (people)**: Sets the minimum quorum for the extension to start monitoring the call. This prevents it from activating in very small meetings.
    2.  **Leave if below (%)**: Sets the percentage of the maximum quorum that, when reached, will trigger the automatic exit. For example, if the peak attendance was 20 people and the percentage is set to 50%, the extension will close the call when the number of participants drops below 10.
* **Enable/Disable Toggle**: The functionality can be turned on or off at any time with a single click.

---

## How to Use

1.  Download the project files.
2.  Open Google Chrome and navigate to `chrome://extensions`.
3.  Enable **"Developer mode"** in the top right corner.
4.  Click **"Load unpacked"** and select the folder where the extension's files (`manifest.json`, `content.js`, etc.) are located.
5.  When you join a Google Meet call, the extension's control panel will appear in the bottom right corner.

---

## Project Structure

This project was developed as a Google Chrome extension using plain JavaScript for logic and DOM manipulation. The main files are:

* `README.md`: This file, containing the project's documentation.
* `manifest.json`: The standard manifest file for Chrome extensions. It defines the name, version, permissions, and which script to inject into the page.
* `content.js`: The heart of the extension. This script contains all the logic for:
    * Creating and managing the floating control panel (UI).
    * Monitoring the number of participants in the call.
    * Executing the quorum check logic and triggering a click on the "Leave call" button.
* `icons/`: A folder that stores the extension's icons.