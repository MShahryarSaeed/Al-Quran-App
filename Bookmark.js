// Bookmark.js  
import React, { useState, useEffect } from 'react';  
import axios from 'axios';  

const Bookmark = ({ userId, surah, ayah }) => {  
    const [bookmarked, setBookmarked] = useState(false);  
    const [bookmarks, setBookmarks] = useState([]);  

    useEffect(() => {  
        const fetchBookmarks = async () => {  
            const response = await axios.get(`/api/bookmarks/${userId}`);  
            setBookmarks(response.data);  
            setBookmarked(response.data.some(b => b.surah === surah && b.ayah === ayah));  
        };  
        fetchBookmarks();  
    }, [userId, surah, ayah]);  

    const toggleBookmark = async () => {  
        if (bookmarked) {  
            const bookmarkToDelete = bookmarks.find(b => b.surah === surah && b.ayah === ayah);  
            await axios.delete(`/api/bookmarks/${bookmarkToDelete._id}`);  
            setBookmarked(false);  
        } else {  
            await axios.post('/api/bookmarks', { userId, surah, ayah });  
            setBookmarked(true);  
        }  
    };  

    return (  
        <button onClick={toggleBookmark}>  
            {bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}  
        </button>  
    );  
};  

export default Bookmark;