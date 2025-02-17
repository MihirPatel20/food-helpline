# Food Helpline

**Guide:** Prof. Amit Solanki\
**Team Members:**

- Mr. Vishal Patel (23172012020)
- Mr. Nayka Shreyash (23172012010)
- Mr. Divy Patel (23172022014)


## **1. Introduction**

### **1.1 Purpose**
The Food Helpline system aims to reduce food waste and address food insecurity by creating an efficient platform connecting restaurants with surplus food to NGOs and food banks.

### **1.2 Project Scope**
- Digital platform for food donation management
- Real-time coordination between restaurants, NGOs, and delivery agents
- Food waste reduction tracking and impact measurement
- Secure and efficient food redistribution system

## **2. System Requirements**

### **2.1 User Types**
1. **Restaurants (Donors)**
   - Profile management
   - Food donation creation and tracking
   - Donation history access
   - Real-time status updates

2. **NGOs (Recipients)**
   - Profile and capacity management
   - Donation request and acceptance
   - Delivery scheduling
   - Food receipt confirmation

3. **Delivery Agents**
   - Profile and availability management
   - Pickup/delivery assignment acceptance
   - Route information access
   - Delivery status updates

4. **System Administrators**
   - User verification and management
   - System monitoring
   - Issue resolution
   - Report generation

### **2.2 Functional Requirements**

#### **2.2.1 Food Donation Management**
1. **Donation Creation**
   - Food type specification
   - Quantity input
   - Preparation time recording
   - Expiration time setting
   - Special handling instructions
   - Packaging details

2. **Donation Matching**
   - Location-based NGO matching
   - Capacity verification
   - Time window compatibility
   - Food type suitability

3. **Status Tracking**
   - Real-time status updates
   - Location tracking during delivery
   - Delivery confirmation
   - Digital proof of delivery

#### **2.2.2 User Management**
1. **Registration & Authentication**
   - User registration with role selection
   - Profile verification process
   - Secure login system
   - Password recovery

2. **Profile Management**
   - Contact information updates
   - Location management
   - Operating hours setting
   - Capacity specification

### **2.3 Non-Functional Requirements**

#### **2.3.1 Performance**
- Page load time: < 3 seconds
- Real-time updates: < 5 seconds delay
- Search results: < 2 seconds
- Concurrent users: Support 100 simultaneous users

#### **2.3.2 Security**
- Secure user authentication
- Data encryption
- Privacy protection
- Regular security audits

#### **2.3.3 Reliability**
- System uptime: 99.9%
- Data backup: Daily
- Error recovery mechanisms
- Fault tolerance

#### **2.3.4 Usability**
- Intuitive interface
- Mobile responsiveness
- Minimal training required
- Multi-language support (English, Hindi, Gujarati)

## **3. System Features**

### **3.1 Core Features**
1. **User Registration & Authentication**
   - Role-based registration
   - Email verification
   - Profile completion

2. **Donation Management**
   - Create donations
   - Track status
   - Update/cancel donations
   - View history

3. **Assignment System**
   - Automatic NGO matching
   - Delivery agent assignment
   - Route optimization
   - Status updates

### **3.2 Supporting Features**
1. **Notification System**
   - New donation alerts
   - Status change notifications
   - Reminder notifications
   - System updates

2. **Reporting System**
   - Donation statistics
   - Impact metrics
   - User activity reports
   - System performance reports

## **4. System Constraints**

### **4.1 Technical Constraints**
- Internet connectivity required
- Mobile device compatibility
- Browser compatibility
- Storage limitations

### **4.2 Business Constraints**
- Food safety regulations
- Transportation regulations
- Time-sensitive operations
- Geographic limitations

## **5. Success Metrics**
- Number of successful donations
- Amount of food saved
- Number of active users
- Average matching time
- Delivery success rate
- User satisfaction ratings

## **6. Future Enhancements**
- Integration with food safety monitoring systems
- Advanced analytics dashboard
- Mobile application development
- Community engagement features
- Gamification elements

## **7. Conclusion**
The Food Helpline system provides a crucial platform for efficient food redistribution, helping reduce waste while addressing food insecurity in the community.

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
