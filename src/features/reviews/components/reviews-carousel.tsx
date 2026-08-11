"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Heart, Image as ImageIcon, MessageCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface ReviewItem {
  id: string;
  author: string;
  badge: string;
  time: string;
  rating: number;
  text: string;
  likes?: number;
  photosCount?: number;
  ownerReply?: {
    author: string;
    time: string;
    text: string;
  };
}

export const liveReviews: ReviewItem[] = [
  {
    id: "1",
    author: "TheProfetic1",
    badge: "1 review",
    time: "a month ago",
    rating: 5,
    text: "Excellent customer service! Nova was patient, professional, and very knowledgeable. She made the whole experience easy and enjoyable. Highly recommend Total Herbal Care!",
  },
  {
    id: "2",
    author: "Jess Poot",
    badge: "Local Guide · 21 reviews",
    time: "5 months ago",
    rating: 5,
    text: "Gabby was amazing! This is my FAV store for gummies and drinks. Every staff member is SO helpful and knowledgeable! Thank you so much.",
    likes: 2,
  },
  {
    id: "3",
    author: "Rashod Mcclary",
    badge: "5 reviews",
    time: "a month ago",
    rating: 5,
    text: "Five stars! Nova was friendly, knowledgeable, and super helpful. Great products and excellent customer service. Highly recommend!",
  },
  {
    id: "4",
    author: "Joseph Small",
    badge: "2 reviews",
    time: "2 months ago",
    rating: 5,
    text: "Love this place! Staff is very knowledgeable about their products and go out their way to make sure you’re comfortable and understand fully about what you’re getting. Would recommend 10/10!",
  },
  {
    id: "5",
    author: "Jack Lawrence",
    badge: "7 reviews",
    time: "2 months ago",
    rating: 5,
    text: "Great selection! Staff is super detailed about recommendations for blunt wraps, papers, slushies, flower, and edibles before checkout.",
  },
  {
    id: "6",
    author: "Ty'Nicha Gray",
    badge: "2 reviews",
    time: "a month ago",
    rating: 5,
    text: "All the way from Maryland going home from tournament in South Carolina. We needed some flowers on the way home…Bryan was awesome and we received new customer discount. Will stop through here again when coming back.",
  },
  {
    id: "7",
    author: "Ston33DaGod GoinNuz",
    badge: "3 reviews · 3 photos",
    time: "a month ago",
    rating: 5,
    text: "Love this store yall always come through. And Melody was really helpful",
    photosCount: 3,
  },
  {
    id: "8",
    author: "Shari Johnson",
    badge: "Local Guide · 31 reviews · 56 photos",
    time: "4 months ago",
    rating: 5,
    text: "Great staff! Very knowledgeable. They have some of everything to satisfy and address any need. Definitely a place to visit and make a purchase",
    photosCount: 56,
  },
  {
    id: "9",
    author: "Alex Rivas",
    badge: "5 reviews",
    time: "a month ago",
    rating: 5,
    text: "Highly recommend if you are near by! Great products and great service shout out to Miguel for being helpful!",
  },
  {
    id: "10",
    author: "Land Scaper",
    badge: "1 review",
    time: "3 months ago",
    rating: 5,
    text: "Always good on customer service. Melody was the lady that helped me find what I needed with no problem",
  },
  {
    id: "11",
    author: "Shea B",
    badge: "8 reviews",
    time: "9 months ago",
    rating: 5,
    text: "I love it here!!! Jacob is my homeguy recommended me and I’ve coming ever since ! High quality and great service!! Highly recommended GOO",
  },
  {
    id: "12",
    author: "Dylan Joseph Best",
    badge: "10 reviews",
    time: "6 months ago",
    rating: 5,
    text: "Great variety of products and dispensary options. Staff is very attentive and helps guide customer choices.",
    likes: 4,
  },
  {
    id: "13",
    author: "Ben Edwards",
    badge: "Local Guide · 31 reviews · 15 photos",
    time: "2 years ago",
    rating: 5,
    text: "Friendly knowledgeable staff with low turnover, clean store with bright lights, safe parking, good vibes emanate from Total Herbal Care💯 Whether you're interested in kicking tobacco with a tasty vape, or looking for premium remedies.",
    photosCount: 4,
    ownerReply: {
      author: "TotalHerbalCare (owner)",
      time: "2 years ago",
      text: "Thank you so much, Ben! We're thrilled to hear you had such a positive experience and appreciate your shoutout to Rummy—he'll be delighted to know he made a difference.",
    },
  },
  {
    id: "14",
    author: "Sarah Thibault",
    badge: "5 reviews",
    time: "a month ago",
    rating: 5,
    text: "Everyone is so helpful! Melody has helped me multiple times and made it such a delightful experience!!",
  },
  {
    id: "15",
    author: "Brandon Greene",
    badge: "1 review",
    time: "6 months ago",
    rating: 5,
    text: "This one of the best spots in Raleigh to get flower and all ya tabacco needs. Great customer service. And Migs was very helpful.",
  },
  {
    id: "16",
    author: "Olivia Knight",
    badge: "1 review",
    time: "2 months ago",
    rating: 5,
    text: "Awesome experience here! Melody was so helpful and got me exactly what i needed",
  },
  {
    id: "17",
    author: "dilissus council",
    badge: "3 reviews",
    time: "5 months ago",
    rating: 5,
    text: "Great store very informative staff would recommend to anyone",
  },
  {
    id: "18",
    author: "Cece Dee",
    badge: "Local Guide · 23 reviews · 3 photos",
    time: "9 months ago",
    rating: 5,
    text: "I will definitely be back! I love everyone vibe and they were so helpful!!! Thy know their stuff for sure!!! Thanks guys!",
    photosCount: 3,
  },
  {
    id: "19",
    author: "Mia Grace Chapman",
    badge: "Local Guide · 17 reviews",
    time: "a month ago",
    rating: 5,
    text: "Amazing shop thank you Joy and Shelby for the help yall are amazing and made the shop that much better!!",
  },
  {
    id: "20",
    author: "A Ung",
    badge: "6 reviews · 1 photo",
    time: "a month ago",
    rating: 5,
    text: "Josh was great knows his stuff appreciate all the help he’s been !!",
    photosCount: 1,
  },
  {
    id: "21",
    author: "Quanaisa Jordan",
    badge: "11 reviews",
    time: "Edited 6 months ago",
    rating: 5,
    text: "Great prouducts!!! Helpful employees!! They advertise different popular products to try!! I went the 1st day it opened! It was already good products then. Even more now!!",
    likes: 1,
  },
  {
    id: "22",
    author: "Deja Martinez",
    badge: "3 reviews · 2 photos",
    time: "2 months ago",
    rating: 5,
    text: "Staff is always so friendly and knowledgeable! Melody is great! :)",
    photosCount: 2,
  },
  {
    id: "23",
    author: "Nila Staten",
    badge: "7 reviews",
    time: "a month ago",
    rating: 5,
    text: "Great service from Josh and Jordan! I highly recommend them!",
  },
];

// Helper to generate consistent avatar initial background color based on author name
const avatarColors = [
  "bg-[#016C24]",
  "bg-[#1A5336]",
  "bg-[#0D2318]",
  "bg-[#2E7D32]",
  "bg-[#155E75]",
  "bg-[#854D0E]",
  "bg-[#3F6212]",
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Update visibleCount based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalReviews = liveReviews.length;
  const maxIndex = Math.max(0, totalReviews - visibleCount);

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplay) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoplay, maxIndex]);

  const handlePrev = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const visibleReviews = liveReviews.slice(currentIndex, currentIndex + visibleCount);
  
  // Fill remaining slots if near the end to ensure full grid
  if (visibleReviews.length < visibleCount) {
    const needed = visibleCount - visibleReviews.length;
    visibleReviews.push(...liveReviews.slice(0, needed));
  }

  const totalPages = Math.ceil(totalReviews / visibleCount);
  const activePage = Math.floor(currentIndex / visibleCount);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* Carousel Grid */}
      <div className="overflow-hidden py-2 px-1">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visibleReviews.map((review) => {
            const avatarBg = getAvatarColor(review.author);
            const initials = getInitials(review.author);

            return (
              <div
                key={`${review.id}-${currentIndex}`}
                className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#EDE8DF] hover:shadow-[0_16px_40px_rgba(13,35,24,0.12)] hover:border-[#016C24]/30 transition-all duration-300 flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Top Bar: Stars + Date/Time */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C9A961] text-[#C9A961]" />
                      ))}
                    </div>
                    <span className="text-xs text-[#767676] font-medium">
                      {review.time}
                    </span>
                  </div>

                  {/* Review Body */}
                  <p className="text-sm leading-relaxed text-[#2C3E35] font-medium mb-6 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                {/* Bottom Section */}
                <div className="space-y-3 pt-4 border-t border-[#EDE8DF]/70">
                  {/* Author Header */}
                  <div className="flex items-center gap-3.5">
                    <div
                      className={cn(
                        "w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-[#016C24]/20 flex-shrink-0",
                        avatarBg
                      )}
                    >
                      {initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-sm text-[#0D2318] truncate font-sans">
                          {review.author}
                        </p>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#016C24] flex-shrink-0" />
                      </div>
                      <p className="text-xs text-[#666666] font-medium truncate">
                        {review.badge}
                      </p>
                    </div>
                  </div>

                  {/* Extra Meta Badges: Likes, Photos */}
                  {(review.likes || review.photosCount) && (
                    <div className="flex items-center gap-3 text-xs text-[#666666] pt-1">
                      {review.likes && (
                        <span className="inline-flex items-center gap-1 bg-[#F5F0E8] px-2.5 py-1 rounded-full text-[#016C24] font-semibold">
                          <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                          {review.likes}
                        </span>
                      )}
                      {review.photosCount && (
                        <span className="inline-flex items-center gap-1 bg-[#F5F0E8] px-2.5 py-1 rounded-full text-[#0D2318] font-medium">
                          <ImageIcon className="w-3 h-3 text-[#016C24]" />
                          {review.photosCount} {review.photosCount === 1 ? "photo" : "photos"}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Owner Reply Box (If applicable) */}
                  {review.ownerReply && (
                    <div className="mt-3 bg-[#F9F7F2] p-3.5 rounded-xl border border-[#EDE8DF] text-xs">
                      <div className="flex items-center justify-between mb-1 text-[#016C24] font-bold">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {review.ownerReply.author}
                        </span>
                        <span className="text-[10px] text-[#767676] font-normal">
                          {review.ownerReply.time}
                        </span>
                      </div>
                      <p className="text-[#4A4A4A] leading-relaxed italic">
                        {review.ownerReply.text}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8">
        {/* Counter Badge */}
        <div className="text-xs font-bold text-[#0D2318] tracking-wider uppercase bg-white px-4 py-2 rounded-full border border-[#EDE8DF] shadow-sm">
          Showing <span className="text-[#016C24]">{currentIndex + 1}</span> -{" "}
          <span className="text-[#016C24]">
            {Math.min(currentIndex + visibleCount, totalReviews)}
          </span>{" "}
          of {totalReviews} Google Reviews
        </div>

        {/* Dots Pagination */}
        <div className="hidden sm:flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, pageIdx) => {
            const isCurrentPage = pageIdx === activePage;
            return (
              <button
                key={pageIdx}
                onClick={() => {
                  setIsAutoplay(false);
                  setCurrentIndex(pageIdx * visibleCount);
                }}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  isCurrentPage
                    ? "w-8 bg-[#016C24]"
                    : "w-2.5 bg-[#C5BEB3] hover:bg-[#016C24]/50"
                )}
                aria-label={`Go to review page ${pageIdx + 1}`}
              />
            );
          })}
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white border border-[#EDE8DF] text-[#0D2318] hover:bg-[#016C24] hover:text-white transition-all flex items-center justify-center shadow-sm hover:scale-105 active:scale-95"
            aria-label="Previous Reviews"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white border border-[#EDE8DF] text-[#0D2318] hover:bg-[#016C24] hover:text-white transition-all flex items-center justify-center shadow-sm hover:scale-105 active:scale-95"
            aria-label="Next Reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
