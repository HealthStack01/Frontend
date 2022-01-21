import React, { useState } from 'react';

import Input from '../basic/Input';
import { TagContainer } from './styles';

function TagInput() {
  const [input] = useState('');
  const [tags] = useState([]);

  return (
    <TagContainer>
      {tags.map((tag, index) => (
        <div key={index}>{tag}</div>
      ))}
      <Input value={input} placeholder="Enter a tag" />
    </TagContainer>
  );
}

export default TagInput;
