import React from 'react'

const formatMesTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
    hour12: true
  });
}

export default formatMesTime
