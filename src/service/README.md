# Domain Service
A Domain Service represents a domain service is an operation offered as an
interface that stands alone in a model, without encapsulating state as 
entities or value objects. A Domain Service is defined in terms of what it 
can do for a client.

There are two types of services: Commands and Queries. A Command is used to 
update data. Commands should be task-based, instead of data centric. A query 
retrieves data from a Data source. A query should not modify any kind of data.