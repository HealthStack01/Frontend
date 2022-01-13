import React, { useState } from 'react';
import Input from '../basic/Input';
import { TagContainer } from './styles';

const TagInput = () => {
  const [input, setInput] = useState('');
  const [tags, setTags] = useState([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = e;
    const trimmedInput = input.trim();

    // if (key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
    //   e.preventDefault();
    //   setTags(prevState => [...prevState, trimmedInput]);
    //   setInput('');
    // }
  };
  return (
    <TagContainer>
      {tags.map((tag, index) => (
        <div key={index}>{tag}</div>
      ))}
      <Input value={input} placeholder='Enter a tag' />
    </TagContainer>
  );
};

export default TagInput;

// Tags inputs
// https://blog.logrocket.com/building-a-tag-input-field-component-for-react/
