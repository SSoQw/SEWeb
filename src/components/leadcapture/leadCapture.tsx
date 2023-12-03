import {ChangeEvent, FormEvent, useState, useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";
import {LngLat} from "mapbox-gl";
import { MapboxDataC, MapboxFeature } from "../../../codecs/mapbox";

const LeadCaptureForm = () => {
  const center = new LngLat(43.597532, -70.709917);
  const location = useLocation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [workProposal, setWorkProposal] = useState("");
  const [statusType, setStatusType] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorField, setErrorField] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [addressSelected, setAddressSelected] = useState(false);
  const [geocodeFailed, setGeocodeFailed] = useState(false);
  const [showDropdown, setShowDropdown] = useState({visible: false, isExpanded: false});


  useEffect(() => {
    adjustTextareaHeight();
  }, [workProposal]);

  useEffect(() => {
    if (statusMessage) {
      setShowStatus(true);

      const timeout = setTimeout(() => {
        setShowStatus(false);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [statusMessage]);

  useEffect(() => {
    setErrorField("");
    clearTimeout(100);
  }, [location.pathname]);


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorField("");
    let missingField = false;

    if (!email && !phone) {
      setErrorField((prev) => prev + "email phone");
      setStatus("info", "Please Enter an Email or Phone Number");
      missingField = true;
    } else {
      if (email && !validateEmail(email)) {
        setErrorField((prev) => prev + "email ");
        setStatus("info", "Please Enter a Valid Email Address");
        missingField = true;
      }

      if (phone && !validatePhoneNumber(phone)) {
        setErrorField((prev) => prev + "phone ");
        setStatus("info", "Please Enter a Valid Phone Number");
        missingField = true;
      }
    }

    if (!workProposal) {
      setErrorField((prev) => prev + "proposal ");
      setStatus("info", "Please Enter a Work Proposal");
      missingField = true;
    }

    if (!address.includes("Maine")) {
      setErrorField((prev) => prev + "address ");
      setStatus("error", "We Currently Only Service Maine");
      missingField = true;
    }

    if (!addressSelected) {
      setErrorField((prev) => prev + "address ");
      setStatus("info", "Please Select an Address from the Dropdown");
      missingField = true;
    }

    if (geocodeFailed) {
      setErrorField((prev) => prev + "address ");
      setStatus("error", "External API Error, Please Email Us instead.");
      missingField = true;
    }

    if (!address) {
      setErrorField((prev) => prev + "address ");
      setStatus("info", "Please Enter a Service Address");
      missingField = true;
    }

    if (!name) {
      setErrorField((prev) => prev + "name ");
      setStatus("info", "Please Enter Your Name");
      missingField = true;
    }

    if (!name && !email && !phone && !address && !workProposal) {
      setErrorField((prev) => prev + "name email phone proposal ");
      setStatus("info", "Please Fill Out the Form");
      missingField = true;
    }

    if (honeypot) {
      setStatus("error", "Your Submission Was Rejected :(");
      return;
    }

    if (missingField) {
      return;
    }

    if (errorField === "" && !honeypot) {
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            email,
            address,
            workProposal,
          }),
        });

        if (response.ok) {
          setStatus("success", "Email sent successfully");
          // Clear form inputs after successful submission
          setName("");
          setEmail("");
          setPhone("");
          setAddress("");
          setWorkProposal("");
        } else {
          setStatus("error", "Internal Server Error, Email us Directly");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        setStatus("error", "Internal Server Error :(");
      }
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\(\d{3}\)-\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  //Status Message Handler
  const setStatus = (type: string, message: string) => {
    setStatusType(type);
    setStatusMessage(message);
  };

  //Retrieves JSON of Addresses from Mapbox
  const geocodeAddress = async (partialAddress: string) => {
    try {
      await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(partialAddress)}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}&country=us&proximity=${center.lng},${center.lat}&limit=4`)
        .then((val) => {
          const addresses = MapboxDataC.parse(val.json()).features
            .filter((feature: MapboxFeature) => feature.place_type.includes("address"))
            .map((feature: MapboxFeature) => feature.place_name);
          setDropdownOptions(addresses);
          setShowDropdown({visible: addresses.length > 0, isExpanded: addresses.length > 0});
        });
    } catch (error) {
      console.error("Error occurred:", error);
      setGeocodeFailed(true);
    }
    /* For when backend is implemented for production
    try {
      const response = await fetch("/api/geocode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ partialAddress }),
      });
      const data = await response.json();
      const addresses = data.addresses;

      setDropdownOptions(addresses);
      setShowDropdown({ visible: addresses.length > 0, isExpanded: addresses.length > 0 });
      } catch (error) {
        console.error("Error occurred:", error);
        setGeocodeFailed(true);
    }
     */
  };


  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    const partialAddress: string = event.target.value;
    setAddress(partialAddress);
    if (partialAddress.length >= 4) {
      geocodeAddress(partialAddress);
      setShowDropdown({
        visible: true,
        isExpanded: true,
      });
      if (addressSelected) {
        setAddressSelected(false);
      }
    } else {
      setDropdownOptions([]);
      setShowDropdown({
        visible: false,
        isExpanded: false,
      });
    }
  };

  const handleAddressSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedAddress: string = event.target.value;
    setAddress(selectedAddress);
    setAddressSelected(true);
    setShowDropdown({
      visible: false,
      isExpanded: false,
    });
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawPhone = event.target.value.replace(/\D/g, "");
    let formatted: string;

    if (rawPhone === "") {
      formatted = "";
    } else if (rawPhone.length < 4) {
      formatted = `(${rawPhone}`;
    } else if (rawPhone.length < 7) {
      formatted = `(${rawPhone.slice(0, 3)})-${rawPhone.slice(3)}`;
    } else {
      formatted = `(${rawPhone.slice(0, 3)})-${rawPhone.slice(3, 6)}-${rawPhone.slice(6, 10)}`;
    }
    setPhone(formatted);
  };


  return (
    <section>
      <h2>Have a Project in Mind? Get in Touch</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div>
            <input
              type="text"
              id="honeypot"
              name="honeypot"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{display: "none"}}
            />
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              pattern="[A-Za-z ]+"
              id="name"
              autoComplete="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errorField.includes("name") ? "highlight" : ""}
            />
            <span className="validity"></span>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              autoComplete="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errorField.includes("email") ? "highlight" : ""}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              autoComplete="tel"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={phone}
              onChange={handlePhoneChange}
              className={errorField.includes("phone") ? "highlight" : ""}
              maxLength={14}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="select-wrapper">
            <label htmlFor="address">Service Address*</label>
            <input
              type="text"
              autoComplete="off"
              value={address}
              placeholder="(Nearest) Street Address"
              onChange={handleAddressChange}
              className={errorField.includes("address") ? "highlight" : ""}
            />
            {showDropdown.visible && (
              <select
                defaultValue=""
                onChange={handleAddressSelect}
                size={showDropdown.isExpanded ? dropdownOptions.length + 1 : 1}
              >
                <option value="" disabled hidden> Select an Address</option>
                {dropdownOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <label htmlFor="proposal">Work Proposal *</label>
        <textarea
          id="proposal"
          autoComplete="off"
          placeholder="Work Proposal"
          value={workProposal}
          onChange={(e) => setWorkProposal(e.target.value)}
          ref={textareaRef}
          className={errorField.includes("proposal") ? "highlight" : ""}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {showStatus && (
        <div className={`status-message ${statusType}`}>
          {statusMessage}
          <span className={`dismiss ${statusType}`} onClick={() => setShowStatus(false)}>x</span>
        </div>
      )}
    </section>
  );
};
export default LeadCaptureForm;
