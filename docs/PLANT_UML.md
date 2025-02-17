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

&nbsp;
## Example: Entity-Relationship (ER) Diagram

The following ER diagram illustrates the core entities and their relationships in the Food Helpline system. It shows how donors, recipients, food donations, and delivery agents interact within the platform.

```
@startuml
entity "Admin" {
    * admin_id : INT
    --
    username : VARCHAR
    password : VARCHAR
    email : VARCHAR
}

entity "Donor" {
    * donor_id : INT
    --
    name : VARCHAR
    contact_info : VARCHAR
    address : TEXT
}

entity "Food Donation" {
    * donation_id : INT
    --
    food_item : VARCHAR
    quantity : INT
    expiration_date : DATE
    status : ENUM('Pending', 'Accepted', 'Completed', 'Rejected')
}

entity "Recipient" {
    * recipient_id : INT
    --
    name : VARCHAR
    contact_info : VARCHAR
    address : TEXT
}

entity "Request" {
    * request_id : INT
    --
    requested_item : VARCHAR
    quantity_needed : INT
    status : ENUM('Pending', 'Approved', 'Fulfilled', 'Rejected')
}

entity "Pickup/Delivery" {
    * delivery_id : INT
    --
    pickup_time : DATETIME
    delivery_time : DATETIME
}

' Relationships with corrected syntax and cardinality

Admin ||--o{ Donor: "manages"
Admin ||--o{ Recipient: "oversees"
Donor ||--o{ "Food Donation": "makes"
Recipient ||--o{ Request: "submits"
"Food Donation" ||--o| Request: "fulfills"
"Food Donation" ||--o| "Pickup/Delivery": "scheduled_for"

@enduml

```



# checking

Let me thoroughly review each diagram's notation and naming:

1. **Use Case Diagram**
- ✓ Correct name
- ✓ Correct notation (actors, use cases, associations)

2. **Sequence Diagram**
- ✓ Correct name
- ⚠️ Could be improved:
  - Missing activation bars/lifelines
  - Should show message returns more clearly
  - Numbers (1:, 2:, etc.) aren't typical in sequence diagrams

3. **Activity Diagram**
- ✓ Correct name
- ✓ Correct notation (start/stop nodes, activities, forks, decisions)

4. **Class Diagram**
- ✓ Correct name
- ⚠️ Could be improved:
  - Missing proper visibility modifiers (+/-/#)
  - Relationships could be more specific (inheritance, composition, etc.)
  - Missing cardinality on some relationships

5. **"Entity-Relationship (ER) Diagram"**
- ❌ Incorrect name - This is actually using Class Diagram notation
- Should use proper ER notation with:
  - Entities (rectangles)
  - Relationships (diamonds)
  - Attributes (ovals)
  - Proper cardinality notation

6. **Data Flow Diagrams (DFD)**
- ✓ Correct name for the category
- ⚠️ Issues in implementation:
  - Level-0: Missing proper DFD symbols (processes should be circles/rounded rectangles)
  - Level-1: Missing data flows and proper process numbering
  - Level-2: Missing external entities and proper DFD notation

Each diagram type has specific notation standards that should be followed to maintain clarity and conform to industry standards. Would you like me to show how to correct any specific diagram?
