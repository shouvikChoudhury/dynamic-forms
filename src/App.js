import formJSON from './formElement.json';
import { useState, useEffect } from 'react';
import Element from './components/Element';
import { FormContext } from './FormContext';

function App() {
  const [elements, setElements] = useState(null);
  useEffect(() => {
    setElements(formJSON[0])

  }, [])

  const [first, setfirst] = useState(1)

  const { fields, page_label } = elements ?? {}

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(elements)
  }
  const handleChange = (id, event) => {
    const newElements = { ...elements }
    newElements.fields.forEach(field => {
      const { field_type, field_id } = field;
      if (id === field_id) {
        switch (field_type) {
          case 'checkbox':
            field['field_value'] = event.target.checked;
            break;

          default:
            field['field_value'] = event.target.value;
            break;
        }
      }
      setElements(newElements)
    });
  }

  const handleAddField = (e) => {
    setfirst(first + 1)
    setElements({
      "page_label": "Job Application Form",
      "fields": [...elements.fields, {
        "field_id": `alernate_input_${first}`,
        "field_label": `Input Field ${first}`,
        "field_mandatory": "yes",
        "field_placeholder": `Enter input value ${first}`,
        "field_type": "text",
        "field_value": ""
      }]
    })
  }

  return (
    <FormContext.Provider value={{ handleChange }}>
      <div className="App container">
        <h3>{page_label}</h3>
        <button onClick={handleAddField}>Add new input field</button>
        <form>
          {fields ? fields.map((field, i) => <Element key={i} field={field} />) : null}

          <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>

      </div>
    </FormContext.Provider>
  );
}

export default App;