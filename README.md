# bookingApi

API to book seats. The booking schema is divided into two parts:
- Row Schema: This contains the number of seats in the row and an array of booked seats in the row.

- Hall Schema: This contains the hall id and map of rows.


## Usage

1. API to add halls and seats : [localhost:4000/api/halls](localhost:4000/api/halls)


```
{
    "hallId": "a1",
    "row": {
        "a": {
            "numberOfSeats": "100"
        },
        "b": {
            "numberOfSeats": "100"
        },
        "c": {
            "numberOfSeats": "100"
        },
        "d": {
            "numberOfSeats": "100"
        },
        "e": {
            "numberOfSeats": "100"
        }
    }
}

```

2. API to book seats in a hall : [localhost:4000/api/halls/{hallId}/book-seats](localhost:4000/api/halls/{hallId}/book-seats)

```
{
    "seats": {
        "a": [
            99,
            98
        ],
        "d": [
            88,
            97
        ]
    }
}
```
