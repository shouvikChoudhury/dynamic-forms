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

  const handleInputField = () => {
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

  const handleSelectField = () => {
    setfirst(first + 1)
    setElements({
      "page_label": "Job Application Form",
      "fields": [...elements.fields, {
        "field_id": `alernate_select_${first}`,
        "field_label": `Select Field ${first}`,
        "field_value": "",
        "field_mandatory": "yes",
        "field_options": [
          {
            "option_label": "Full-Time"
          },
          {
            "option_label": "Part-Time"
          }
        ],
        "field_type": "select"
      }]
    })
  }

  const handleCheckField = () => {
    setfirst(first + 1)
    setElements({
      "page_label": "Job Application Form",
      "fields": [...elements.fields, {
        "field_id": `alernate_checkbox_${first}`,
        "field_label": `I confirm to have checkbox ${first}`,
        "field_type": "checkbox",
        "field_value": true
      }]
    })
  }

  const handleDelete = (e, field_id) => {
    e.preventDefault();
    setElements({
      "page_label": "Job Application Form",
      "fields": elements.fields.filter(i => i.field_id !== field_id)
    })
  }

  return (
    <FormContext.Provider value={{ handleChange }}>
      <div className="App container">
        <div className='d-flex justify-content-between'>
          <h3>{page_label}</h3>
          <button onClick={handleInputField}>Add new input field</button>
          <button onClick={handleSelectField}>Add new select dropdown</button>
          <button onClick={handleCheckField}>Add new check box</button>
        </div>
        <form>
          {fields ? fields.map((field, i) => {
            return <div key={i}><Element field={field} />
              <button className='mb-5' onClick={(e) => handleDelete(e, field.field_id)}>Delete</button></div>
          }) : null}

          <button type="submit" className="btn btn-primary mt-3" onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>

      </div>
    </FormContext.Provider>
  );
}

export default App;