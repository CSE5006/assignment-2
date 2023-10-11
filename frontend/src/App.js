import { useState, useEffect, useCallback } from "react";

function App() {
    const [contacts, setContacts] = useState([]);
    const [newContactName, setNewContactName] = useState("");
  
    const fetchData = async (url, options = {}) => {
      const response = await fetch(url, options);
      return await response.json();
    };
  
    const fetchContacts = useCallback(async () => {
      try {
        const data = await fetchData("http://localhost:5001/api/contacts");
        setContacts(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }, [fetchData]);
  
    useEffect(() => {
      fetchContacts();
    }, [fetchContacts]);

    const createContact = async (name) => {
        try {
        await fetchData("http://localhost:5001/api/contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });
        setNewContactName("");
        fetchContacts();
        } catch (error) {
        console.log("Error:", error);
        }
    };

    const deleteContact = async (contactId) => {
        try {
        await fetchData(`http://localhost:5001/api/contacts/${contactId}`, {
            method: "DELETE",
        });
        fetchContacts();
        } catch (error) {
        console.log("Error:", error);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Contactor</h1>

            <div className="mainContainer">
                <h2>Contact</h2>

                <div style={styles.contactForm}>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="New Contact Name"
                        value={newContactName}
                        onChange={(e) => setNewContactName(e.target.value)}
                    />
                    <button
                        style={styles.buttonAdd}
                        onClick={() => {
                        if (newContactName.trim() === "") {
                            alert("Contact name cannot be blank");
                            return;
                        }
                        createContact(newContactName);
                        setNewContactName("");
                        }}
                    >
                        Create Contact
                    </button>
                </div>

                <hr />
                <div className="contactList">
                    {contacts.map((contact) => (
                        <ContactCard
                        key={contact.id}
                        contact={contact}
                        deleteContact={deleteContact}
                        fetchData={fetchData}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ContactCard({ contact, deleteContact, fetchData }) {
    const [phones, setPhones] = useState([]);
    const [phoneName, setPhoneName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
  
    useEffect(() => {
      fetchPhones();
    }, []);
  
    const fetchPhones = async () => {
        try {
            const data = await fetchData(
                `http://localhost:5001/api/contacts/${contact.id}/phones`
            );
            console.log("Contact ID:", contact.id, "Phones:", data);
            setPhones(data);
        } catch (error) {
            console.log("Error fetching phones:", error);
        }
      };
      
  
      const addPhone = async () => {
        if (!phoneName.trim() || !phoneNumber.trim()) {
            alert("Both phone name and number are required!");
            return;
        }
    
        try {
            await fetchData(
                `http://localhost:5001/api/contacts/${contact.id}/phones`, 
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: phoneName,
                        number: phoneNumber,
                        contactId: contact.id
                    }),
                }
            );
            setPhoneName("");
            setPhoneNumber("");
            fetchPhones();
        } catch (error) {
            console.log("Error adding phone:", error);
        }
    };
    
  
    const deletePhone = async (phoneId) => {
      try {
        await fetchData(
          `http://localhost:5001/api/contacts/${contact.id}/phones/${phoneId}`,
          {
            method: "DELETE",
          }
        );
        fetchPhones();
      } catch (error) {
        console.log("Error deleting phone:", error);
      }
    };

    const [showDetails, setShowDetails] = useState(false);

    return (
        <div style={styles.contactCard}>
            <div className="Info" onClick={() => setShowDetails(!showDetails)}>
                {contact.name}
                <button style={styles.contactDeleteButton} onClick={(e) => { e.stopPropagation(); deleteContact(contact.id); }}>
                    Delete
                </button>
            </div>

            {showDetails && (
                <>
                    <div style={styles.phoneInput}>
                        <input 
                            style={styles.input}
                            placeholder="Name" 
                            value={phoneName} 
                            onChange={(e) => setPhoneName(e.target.value)}
                        />
                        <input 
                            style={styles.input}
                            placeholder="Phone Number" 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <button style={styles.button} onClick={addPhone}>Add</button>
                    </div>

                    <div style={styles.table}>
                        <div style={styles.row}>
                            <div style={styles.cell}>Name</div>
                            <div style={styles.cell}>Phone Number</div>
                            <div style={styles.cell}></div>
                        </div>

                        {phones.map(phone => (
                            <div key={phone.id} style={styles.row}>
                                <div style={styles.cell}>{phone.name}</div>
                                <div style={styles.cell}>{phone.number}</div>
                                <div style={{ ...styles.cell, ...styles.lastCell }}>
                                    <button style={styles.buttonDelete} onClick={() => deletePhone(phone.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        width: '50%',
        margin: '0 auto',
        paddingTop: '50px',
        paddingBottom: '50px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
    },
    header: {
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '40px',
        textAlign: 'center'
    },
    contactForm: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '30px'
    },
    input: {
        flex: 1,
        padding: '10px',
        marginRight: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc'
    },
    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginLeft: '10px',
    },
    contactCard: {
        border: '1px solid #e0e0e0',
        padding: '20px',
        marginTop: '20px',
        borderRadius: '5px',
        position: 'relative'
    },
    phoneInput: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px',
        marginBottom: '10px'
    },
    phoneRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
        alignItems: 'center',
        borderBottom: '1px solid #e0e0e0',
        padding: '10px 0',
    },
    deleteButton: {
        backgroundColor: 'red',
        color: 'white'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    row: {
        display: 'flex',
        borderBottom: '1px solid #ccc', // Add bottom border to each row
    },
    cell: {
        flex: 1,
        padding: '10px',
        borderRight: '1px solid #ccc', // Add right border to each cell
    },
    // Remove border from the last cell in the row
    lastCell: {
        borderRight: 'none',
    }
};

styles.buttonAdd = {
    ...styles.button,
    backgroundColor: '#4CAF50',
    color: 'white'
};

styles.buttonDelete = {
    ...styles.button,
    backgroundColor: 'red',
    color: 'white',
    marginLeft: '10px'
};

styles.contactDeleteButton = {
    ...styles.buttonDelete,
    position: 'absolute',
    top: '10px',
    right: '10px'
};


export default App;
