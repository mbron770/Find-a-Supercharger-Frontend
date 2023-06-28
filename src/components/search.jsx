import { useState } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Search({handleAddressChange,handleAddressSelect,address}) {

    console.log (address)
    return (
      <>
      <Form.Group controlId="addressCityStateZip">
          <Form.Label>Address</Form.Label>
          <div>
              <PlacesAutocomplete
                  value={address}
                  onChange={handleAddressChange}
                  onSelect={handleAddressSelect}
              >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                      <Form.Control
                      {...getInputProps({
                          placeholder: 'Address',
                          size: 'sm',
                      })}
                      style={{ width: '50%' }}
                      />
                      <div>
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                          const style = {
                          backgroundColor: suggestion.active ? '#e2e2e2' : '#fff',
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
      </>
    );
  }