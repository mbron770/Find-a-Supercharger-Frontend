import PlacesAutocomplete from 'react-places-autocomplete';
import Form from 'react-bootstrap/Form';

export default function Search({ handleAddressChange, handleAddressSelect, address }) {

  console.log(address);
  return (
    <>
    <div>
      <br></br>
      <Form.Group
        controlId="addressCityStateZip"
        style={{
          width: "60vh",
          position: "fixed",
          top: "16%",
          left: "35%",
          zIndex: "9999",
          borderRadius: "25px",
        }}
      >
        <div>
          <PlacesAutocomplete
            value={address}
            onChange={handleAddressChange}
            onSelect={handleAddressSelect}
            searchOptions={{ types: ['address'], componentRestrictions: { country: 'us' } }}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <Form.Control
                  {...getInputProps({
                    placeholder: "Find a Charging Station Nearby...",
                    size: "md",
                  })}
                //   style={{
                //     width: "60vh",
                //     position: "fixed",
                //     top: "9.75%",
                //     bottom: "85%",
                //     left: "35%",

                //     backgroundColor: "rgba(211, 211, 211, 0.8)",
                //     zIndex: "9999",
                //     borderRadius: "25px",
                //   }}
                  style={{ 
                    position: "fixed", 
                    width: "60vh", 
                    top: "7.5vh", 
                    zIndex: "9999", 
                    backgroundColor: "rgba(211, 211, 211, 0.8)",
                    borderRadius: "25px"}}
                />
                <div>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#e2e2e2" : "#fff",
                    };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { style })}
                        key={suggestion.placeId}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
      </Form.Group>
    </div>
  </>
  );
}
