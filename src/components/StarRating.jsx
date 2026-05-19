import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { Box } from '@mui/material';

export default function StarRating({ rating, maxStars = 5, size = "small" }) {
  // रेटिंग संख्या अचूकपणे दाखवण्यासाठी स्टार्सची रचना ठरवणे
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= maxStars; i++) {
    if (i <= fullStars) {
      // पूर्ण भरलेला स्टार
      stars.push(<StarIcon key={i} fontSize={size} sx={{ color: '#F59E0B' }} />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      // अर्धा भरलेला स्टार (जर रेटिंग ४.५ सारखे असेल तर)
      stars.push(<StarHalfIcon key={i} fontSize={size} sx={{ color: '#F59E0B' }} />);
    } else {
      // रिकामा स्टार
      stars.push(<StarBorderIcon key={i} fontSize={size} sx={{ color: '#cbd5e1' }} />);
    }
  }

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
      {stars}
    </Box>
  );
}
