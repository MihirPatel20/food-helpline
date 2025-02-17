# Food Helpline

**Guide:** Prof. Amit Solanki\
**Team Members:**

- Mr. Vishal Patel (23172012020)
- Mr. Nayka Shreyash (23172012010)
- Mr. Divy Patel (23172022014)


## **Introduction**

Food waste is a growing problem, especially when many people struggle to get enough to eat. The **Smart Food Redistribution Platform** aims to bridge this gap by connecting restaurants with NGOs and food banks. This platform enables restaurants to donate excess food, while distributors facilitate its delivery to those in need.


### **Problem Definition**

Every day, significant amounts of surplus food from restaurants go to waste, while many families face food insecurity. Food waste is a critical environmental issue, leading to unnecessary resource consumption and pollution.

### **Proposed Solution**

- Minimize food waste by redirecting surplus food to those in need.
- Improve inefficient and uncoordinated current redistribution methods.
- Enhance logistical coordination to optimize food distribution.


## **Functional Requirements**

- **User Types:** Support different user types (restaurants, food banks, shelters, volunteers, administrators).
- **Surplus Logging:** Restaurants can log surplus food with details like type, quantity, expiration date, and handling instructions.
- **Recipient Matching:** The system automatically matches surplus food with recipient organizations based on location and capacity.
- **Responsive Design:** Accessible via both mobile devices and web browsers.
- **Pickup Scheduling:** Enables scheduling of food pickups.


## **Non-Functional Requirements**

- **Response Time:** User interactions (e.g., logging food, scheduling pickups) should respond within 2 seconds.
- **Uptime:** The system must ensure a minimum of 99.9% uptime.
- **User Interface:** The platform should be user-friendly, with intuitive navigation for all users.
- **Data Encryption:** Secure data using AES-256 encryption (both in transit and at rest).



&nbsp;

## **UML Diagrams**

#### **Use Case Diagram**

```plantuml
@startuml
left to right direction

actor "Restaurant" as Donor
actor "Delivery Agent" as Agent
actor "System Admin" as Admin

rectangle "Food Helpline System" {
    usecase "Submit Food Donation" as UC1
    usecase "Track Donation Status" as UC2
    usecase "Manage Profile" as UC3
    usecase "Request Food Information" as UC4
    usecase "Process Food Pickup" as UC5
    usecase "Monitor System Logs" as UC6
    usecase "Manage User Database" as UC7
    usecase "Update Food Inventory" as UC8

    Donor --> UC1
    Donor --> UC2
    Donor --> UC3
    Donor --> UC4

    Agent --> UC2
    Agent --> UC3
    Agent --> UC4
    Agent --> UC5

    Admin --> UC6
    Admin --> UC7
    Admin --> UC8

    Donor -[hidden]-> UC1
    Agent -[hidden]-> UC5
}
@enduml

```

#### **Sequence Diagram**

```plantuml
@startuml
actor "Restaurant" as Donor
participant "System Admin" as Admin
actor "Delivery Agent" as Agent

Donor -> Admin : 1: Login/Register()
Admin --> Donor : 2: Authentication Success()

Donor -> Admin : 3: Submit Donation Details()
Admin --> Donor : 4: Confirm Donation()
Donor -> Admin : 5: Update Food Details()

Agent -> Admin : 6: Login()
Admin --> Agent : 7: Authentication Success()

Agent -> Admin : 8: View Available Donations()
Admin --> Agent : 9: Display Pickup List()

Agent -> Admin : 10: Update Delivery Status()
@enduml

```

#### **Activity Diagram**

```plantuml
@startuml
start

:Login;
:Enter Username and Password;

if (Valid Credentials?) then (Yes)
    if (Select Class and Subject?) then (Yes)
        :Scan the QR Code;
        if (Valid Attendance Request?) then (Yes)
            :Enter Attendance Details;
            :Submit Attendance;
        else (No)
            stop
        endif
    else (No)
        stop
    endif
else (No)
    if (View Attendance Report?) then (Yes)
        :View Attendance Report;
    else (No)
        :Logout;
    endif
endif

stop
@enduml

```

#### **Class Diagram**

```plantuml
@startuml

class Restaurant {
    +name: String
    +password: String
    +contactNumber: String
    +emailID: String
    --
    +register()
    +login()
    +manageFoodDonation()
    +viewDonationStatus()
    +logout()
}

class DeliveryAgent {
    +name: String
    +password: String
    +contactNumber: String
    +emailID: String
    --
    +register()
    +login()
    +receiveNotifications()
    +submitReport()
    +logout()
}

class SystemAdmin {
    +agentList: List<DeliveryAgent>
    +donorList: List<Restaurant>
    +adminID: String
    +agentDetails: Map
    +donorDetails: Map
    --
    +manageAgents()
    +manageDonors()
    +manageFoodInventory()
    +updateSystemSettings()
}

Restaurant --> SystemAdmin : Submits Food Details
DeliveryAgent --> SystemAdmin : Views Donation Details

@enduml

```

#### **Entity-Relationship (ER) Diagram**

```plantuml
@startuml
entity User {
  * userID : int [PK]
  --
  name : String
  email : String [Unique]
  password : String
  role : Enum {Restaurant, Recipient, Volunteer, Admin}
}

entity Restaurant {
  * restaurantID : int [PK]
  --
  name : String
  location : String
  contact : String [Unique]
}

entity SurplusFood {
  * foodID : int [PK]
  --
  type : String
  quantity : int
  expirationDate : DateTime
  specialInstructions : Text [Optional]
}

entity Recipient {
  * recipientID : int [PK]
  --
  name : String
  location : String
  capacity : int
}

entity Volunteer {
  * volunteerID : int [PK]
  --
  name : String
  availability : Boolean
}

User ||--o{ Restaurant
User ||--o{ Recipient
User ||--o{ Volunteer
Restaurant ||--o{ SurplusFood
Recipient ||--o{ SurplusFood
Volunteer }o--|| SurplusFood
@enduml
```

---

#### **Data Flow Diagrams**

##### **Level-0 DFD**

```plantuml
@startuml
actor "Restaurant" as Donor
actor "Food Bank/NGO" as NGO

rectangle "0.0 Food Helpline System" as FoodHelpline {
}

Donor --> FoodHelpline : Submit Donation
FoodHelpline --> Donor : Confirmation

NGO --> FoodHelpline : Request Food
FoodHelpline --> NGO : Donation Details
@enduml

```

##### **Level-1 DFD**

```plantuml
@startuml
actor USER
database USER_MST

rectangle "3.1 Registration" as Registration {
}

rectangle "3.2 Login" as Login {
}

rectangle "3.3 Forget Password" as ForgetPassword {
}

USER --> Registration : Request for Registration
Registration --> USER : Request Accept/Reject
Registration --> USER_MST : Check for Registration
USER_MST --> Registration : Response

USER --> Login : Request for Login
Login --> USER : Request Accept/Reject
Login --> USER_MST : Check for Login
USER_MST --> Login : Response

USER --> ForgetPassword : Request for password
ForgetPassword --> USER : Request Accept/Reject
ForgetPassword --> USER_MST : Check for new password
USER_MST --> ForgetPassword : Response
@enduml

```

##### **Level-2 DFD**

```plantuml
@startuml
database "Inventory Database" as InventoryDB
rectangle "Info about daily sold items and amount" as InfoSource

rectangle "4.1 Access Sold Items and Inventory Data" as AccessData
rectangle "4.2 Aggregate Inventory Data and Sold Items" as AggregateData
rectangle "4.3 Compute Total Price of Each Item" as ComputePrice
rectangle "4.4 Prepare Management Report" as PrepareReport

InventoryDB --> AccessData : inventory data
AccessData --> InfoSource : sold items

AccessData --> AggregateData : sold items, inventory data
AggregateData --> ComputePrice : inventory and sold items list
ComputePrice --> PrepareReport : inventory and sold items list
PrepareReport --> "Restaurant Manager" : management report
@enduml

```




## **Conclusion**

The **Food Helpline** is a crucial initiative addressing both food waste and food insecurity. By efficiently redistributing surplus food, the platform helps mitigate environmental impact while ensuring vulnerable populations have access to nutritious meals. Key components such as effective communication, stakeholder collaboration, logistics management, and community outreach drive the success of this project.

By integrating sustainability practices and feedback mechanisms, the helpline can continuously improve, adapting to evolving community needs
