import React, { useRef, useState, useEffect } from "react";  

import { IoChevronBack } from "react-icons/io5";  
import { Link } from "react-router-dom";  
import { useAlquran } from "../store/quran-context";  
import Modal, { InfoModalRef } from "./Modal";  

const HeaderDetail: React.FC<{ onShow: () => void }> = () => {  
    const modal = useRef<InfoModalRef>(null);  
    const [bookmarked, setBookmarked] = useState(false);  
    const [bookmarks, setBookmarks] = useState<any[]>([]);  

    const { quranState }: any = useAlquran();  
    const {  
        suratSelanjutnya: { nomor: nextSurahNomor, namaLatin: nextNamaLatin },  
        suratSebelumnya: { nomor: prevSurahNomor, namaLatin: prevNamaLatin },  
        namaLatin,  
        arti,  
        tempatTurun,  
        jumlahAyat,  
    } = quranState.surahDetail;  

    useEffect(() => {  
        const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");  
        setBookmarks(storedBookmarks);  
        checkIfBookmarked(storedBookmarks);  
    }, []);  

    const checkIfBookmarked = (storedBookmarks: any[]) => {  
        const isBookmarked = storedBookmarks.some(  
            (bookmark) => bookmark.nomor === quranState.surahDetail.nomor  
        );  
        setBookmarked(isBookmarked);  
    };  

    const toggleBookmarkHandler = () => {  
        const currentBookmark = { nomor: quranState.surahDetail.nomor, nama: namaLatin };  
        let updatedBookmarks;  

        if (bookmarked) {  
            updatedBookmarks = bookmarks.filter(  
                (bm) => bm.nomor !== quranState.surahDetail.nomor  
            );  
        } else {  
            updatedBookmarks = [...bookmarks, currentBookmark];  
        }  

        setBookmarks(updatedBookmarks);  
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));  
        setBookmarked(!bookmarked);  
    };  

   

    return (  
        <>  
            {/* Modal */}  
            <Modal ref={modal}>  
                <div className="flex justify-between items-center">  
                    <div className="font-semibold">  
                        <p>Surat {namaLatin}</p>  
                    </div>  
                    <div>  
                        <span className="font-semibold">Tempat Wahyu </span>  
                        <p>{tempatTurun}</p>  
                    </div>  
                    <div>  
                        <span className="font-semibold">Jumlah Ayat </span>  
                        <p>{jumlahAyat}</p>  
                    </div>  
                </div>  
                <hr className="my-3" />  
                <div  
                    dangerouslySetInnerHTML={{ __html: quranState.surahDetail.deskripsi }}  
                    className="text-justify"  
                ></div>  
            </Modal>  
            <div className="py-2 w-11/12 sm:w-3/4 mt-8">  
                <div className="bg-white p-7 rounded-md border flex justify-between items-center shadow-[0_20px_15px_-20px_rgba(68,68,68,0.3)] mb-4 transform transition-transform ease-out duration-300 animate-fadeIn">  
                    <Link to={`/surat/${prevSurahNomor}`} className="text-[9px] sm:text-[18px]">  
                        {prevNamaLatin}  
                    </Link>  

                    <div className="text-center">  
                        <div className="font-bold text-[12px] sm:text-[18px]">  
                            {namaLatin}  
                        </div>  
                        <div className="text-[10px] sm:text-[14px]">{arti}</div>  
                    </div>  

                    <Link to={`/surat/${nextSurahNomor}`} className="text-[9px] sm:text-[18px]">  
                        {nextNamaLatin}  
                    </Link>  
                </div>  

                <div className="flex justify-between items-center text-[12px] sm:text-[15px] text-slate-500 font-bold">  
                    <Link to={"/"}>  
                        <div className="inline-flex items-center hover:text-slate-800">  
                            <IoChevronBack size={20} className="mr-1" />  
                            Back  
                        </div>  
                    </Link>  
                    <div>    
                        <button onClick={toggleBookmarkHandler} className="ml-3 inline-flex items-center hover:text-slate-800">  
                            {bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}  
                        </button>  
                    </div>  
                </div>  
                <hr className="h-1 text-slate-950" />  

                {/* Bookmarks Section */}  
                <div className="mt-4">  
                    <h3 className="font-bold text-lg">Bookmarks</h3>  
                    <ul className="list-disc list-inside">  
                        {bookmarks.length > 0 ? (  
                            bookmarks.map((bookmark) => (  
                                <li key={bookmark.nomor}>  
                                    <Link to={`/surat/${bookmark.nomor}`} className="hover:text-blue-600">  
                                        {bookmark.nama}  
                                    </Link>  
                                </li>  
                            ))  
                        ) : (  
                            <li>No bookmarks yet.</li>  
                        )}  
                    </ul>  
                </div>  
            </div>  
        </>  
    );  
};  

export default HeaderDetail;