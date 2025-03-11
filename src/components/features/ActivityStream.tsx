"use client";

import React, { useState } from 'react';
import { 
  RiUser3Line, 
  RiRobot2Line, 
  RiTeamLine, 
  RiSettings4Line,
  RiChat1Line,
  RiThumbUpLine,
  RiHeartLine,
  RiEmotionLine,
  RiMoreLine,
  RiTimeLine
} from 'react-icons/ri';
import { useUIStore, Activity, Comment, Reaction } from '@/store/uiStore';
import { formatDistanceToNow } from 'date-fns';

// Sample user data for demo purposes
const currentUser = {
  id: 'user-1',
  name: 'Ian Kuria',
  avatar: ''
};

// Available reactions
const availableReactions = [
  { emoji: '👍', label: 'Like' },
  { emoji: '❤️', label: 'Love' },
  { emoji: '🎉', label: 'Celebrate' },
  { emoji: '💡', label: 'Idea' },
  { emoji: '🤔', label: 'Thinking' }
];

export interface ActivityStreamProps {
  activities?: Activity[];
  limit?: number;
  className?: string;
  showComments?: boolean;
  showReactions?: boolean;
  interactive?: boolean;
  compact?: boolean;
}

export default function ActivityStream({
  activities,
  limit = 10,
  className = '',
  showComments = true,
  showReactions = true,
  interactive = true,
  compact = false
}: ActivityStreamProps) {
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);
  const [showReactionPicker, setShowReactionPicker] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  
  // Get activities from store if not provided as prop
  const storeActivities = useUIStore(state => state.activities);
  const addComment = useUIStore(state => state.addCommentToActivity);
  const addReaction = useUIStore(state => state.addReactionToActivity);
  
  const displayActivities = activities || storeActivities;
  
  // Apply filters and limit
  const filteredActivities = displayActivities
    .slice(0, limit);
  
  const toggleExpandActivity = (activityId: string) => {
    setExpandedActivity(expandedActivity === activityId ? null : activityId);
  };
  
  const toggleReactionPicker = (activityId: string) => {
    setShowReactionPicker(showReactionPicker === activityId ? null : activityId);
  };
  
  const handleReaction = (activityId: string, reactionType: 'like' | 'celebrate' | 'support' | 'insightful' | 'curious') => {
    addReaction(activityId, {
      userId: currentUser.id,
      type: reactionType
    });
    setShowReactionPicker(null);
  };
  
  const handleCommentChange = (activityId: string, value: string) => {
    setCommentInputs({
      ...commentInputs,
      [activityId]: value
    });
  };
  
  const handleCommentSubmit = (activityId: string) => {
    const commentText = commentInputs[activityId]?.trim();
    if (!commentText) return;
    
    addComment(activityId, {
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: commentText
    });
    
    // Clear input
    setCommentInputs({
      ...commentInputs,
      [activityId]: ''
    });
  };
  
  // Helper function to format timestamp
  const formatTimestamp = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };
  
  // Helper to get reaction count by type
  const getReactionCount = (reactions: Reaction[] | undefined, type: string) => {
    if (!reactions) return 0;
    return reactions.filter(r => r.type === type).length;
  };
  
  // Helper to check if current user has reacted
  const hasUserReacted = (reactions: Reaction[] | undefined, type: string) => {
    if (!reactions) return false;
    return reactions.some(r => r.userId === currentUser.id && r.type === type);
  };
  
  if (filteredActivities.length === 0) {
    return (
      <div className={`text-center py-6 text-neutral-500 ${className}`}>
        No activities to display
      </div>
    );
  }
  
  return (
    <div className={`activity-stream ${className}`}>
      <ul className="space-y-4">
        {filteredActivities.map((activity) => (
          <li 
            key={activity.id}
            className={`bg-white dark:bg-neutral-800 rounded-lg ${compact ? 'p-3' : 'p-4'} border border-neutral-200 dark:border-neutral-700 transition-all`}
          >
            {/* Activity Header */}
            <div className="flex items-start gap-3">
              {/* User Avatar */}
              <div className="flex-shrink-0">
                {activity.userAvatar ? (
                  <img 
                    src={activity.userAvatar} 
                    alt={activity.userName}
                    className={`rounded-full bg-neutral-200 ${compact ? 'w-8 h-8' : 'w-10 h-10'}`}
                  />
                ) : (
                  <div className={`rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300 ${compact ? 'w-8 h-8' : 'w-10 h-10'}`}>
                    <RiUser3Line size={compact ? 16 : 20} />
                  </div>
                )}
              </div>
              
              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-1">
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {activity.userName}
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {activity.action}
                  </span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                    {activity.target}
                  </span>
                </div>
                
                {/* Timestamp */}
                <div className={`text-neutral-500 dark:text-neutral-400 ${compact ? 'text-xs mt-0.5' : 'text-sm mt-1'}`}>
                  <span className="flex items-center gap-1">
                    <RiTimeLine size={compact ? 12 : 14} />
                    {formatTimestamp(activity.timestamp)}
                  </span>
                </div>
              </div>
              
              {/* Action Menu (if interactive) */}
              {interactive && !compact && (
                <button className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200">
                  <RiMoreLine size={18} />
                </button>
              )}
            </div>
            
            {/* Reactions Section */}
            {showReactions && activity.reactions && activity.reactions.length > 0 && (
              <div className={`flex flex-wrap gap-2 ${compact ? 'mt-2' : 'mt-3'}`}>
                {/* Like reaction */}
                {getReactionCount(activity.reactions, 'like') > 0 && (
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 ${hasUserReacted(activity.reactions, 'like') ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-600 dark:text-neutral-300'}`}>
                    <RiThumbUpLine size={compact ? 12 : 14} />
                    <span className={compact ? 'text-xs' : 'text-sm'}>
                      {getReactionCount(activity.reactions, 'like')}
                    </span>
                  </div>
                )}
                
                {/* Celebrate reaction */}
                {getReactionCount(activity.reactions, 'celebrate') > 0 && (
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 ${hasUserReacted(activity.reactions, 'celebrate') ? 'text-success-600 dark:text-success-400' : 'text-neutral-600 dark:text-neutral-300'}`}>
                    <RiHeartLine size={compact ? 12 : 14} />
                    <span className={compact ? 'text-xs' : 'text-sm'}>
                      {getReactionCount(activity.reactions, 'celebrate')}
                    </span>
                  </div>
                )}
                
                {/* Other reactions */}
                {getReactionCount(activity.reactions, 'insightful') + getReactionCount(activity.reactions, 'curious') + getReactionCount(activity.reactions, 'support') > 0 && (
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300`}>
                    <RiEmotionLine size={compact ? 12 : 14} />
                    <span className={compact ? 'text-xs' : 'text-sm'}>
                      {getReactionCount(activity.reactions, 'insightful') + getReactionCount(activity.reactions, 'curious') + getReactionCount(activity.reactions, 'support')}
                    </span>
                  </div>
                )}
              </div>
            )}
            
            {/* Comments Section */}
            {showComments && activity.comments && activity.comments.length > 0 && (
              <div className={`${compact ? 'mt-2' : 'mt-3'} ${expandedActivity === activity.id || compact ? '' : 'max-h-24 overflow-hidden'}`}>
                {/* Show all comments if expanded or in compact mode, otherwise just the first one */}
                {(expandedActivity === activity.id || compact ? activity.comments : activity.comments.slice(0, 1)).map((comment) => (
                  <div key={comment.id} className={`${compact ? 'mt-2' : 'mt-3'} pl-4 border-l-2 border-neutral-200 dark:border-neutral-700`}>
                    <div className="flex items-start gap-2">
                      {/* Comment Avatar */}
                      {!compact && (
                        <div className="flex-shrink-0">
                          {comment.userAvatar ? (
                            <img 
                              src={comment.userAvatar} 
                              alt={comment.userName}
                              className="w-6 h-6 rounded-full bg-neutral-200"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300">
                              <RiUser3Line size={12} />
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Comment Content */}
                      <div className="flex-1 min-w-0">
                        <div className={`${compact ? 'text-xs' : 'text-sm'}`}>
                          <span className="font-medium text-neutral-900 dark:text-white">
                            {comment.userName}
                          </span>
                          <span className="text-neutral-800 dark:text-neutral-200 ml-1">
                            {comment.content}
                          </span>
                        </div>
                        
                        {/* Comment Timestamp */}
                        {!compact && (
                          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                            {formatTimestamp(comment.timestamp)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Show more/less comments button */}
                {!compact && activity.comments.length > 1 && (
                  <button 
                    onClick={() => toggleExpandActivity(activity.id)}
                    className="text-xs text-primary-600 dark:text-primary-400 mt-2 hover:underline"
                  >
                    {expandedActivity === activity.id 
                      ? `Show less comments` 
                      : `Show ${activity.comments.length - 1} more comments`}
                  </button>
                )}
              </div>
            )}
            
            {/* Interactive Elements (Add Comment, React) */}
            {interactive && !compact && (
              <div className="mt-3 pt-2 border-t border-neutral-200 dark:border-neutral-700 flex items-center gap-2">
                {/* Comment button */}
                <button 
                  onClick={() => toggleExpandActivity(activity.id)}
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1"
                >
                  <RiChat1Line size={16} />
                  <span>Comment</span>
                </button>
                
                {/* React button */}
                <div className="relative">
                  <button 
                    onClick={() => toggleReactionPicker(activity.id)}
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1"
                  >
                    <RiEmotionLine size={16} />
                    <span>React</span>
                  </button>
                  
                  {/* Reaction Picker */}
                  {showReactionPicker === activity.id && (
                    <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 p-2 z-10">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleReaction(activity.id, 'like')}
                          className="hover:bg-neutral-100 dark:hover:bg-neutral-700 p-1 rounded"
                          title="Like"
                        >
                          <RiThumbUpLine size={20} className="text-primary-500" />
                        </button>
                        <button 
                          onClick={() => handleReaction(activity.id, 'celebrate')}
                          className="hover:bg-neutral-100 dark:hover:bg-neutral-700 p-1 rounded"
                          title="Celebrate"
                        >
                          <RiHeartLine size={20} className="text-success-500" />
                        </button>
                        <button 
                          onClick={() => handleReaction(activity.id, 'insightful')}
                          className="hover:bg-neutral-100 dark:hover:bg-neutral-700 p-1 rounded"
                          title="Insightful"
                        >
                          <RiEmotionLine size={20} className="text-info-500" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Comment Input */}
            {interactive && !compact && expandedActivity === activity.id && (
              <div className="mt-3 flex items-start gap-2">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300">
                    <RiUser3Line size={16} />
                  </div>
                </div>
                <div className="flex-1">
                  <textarea
                    value={commentInputs[activity.id] || ''}
                    onChange={(e) => handleCommentChange(activity.id, e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-3 py-2 bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={2}
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => handleCommentSubmit(activity.id)}
                      disabled={!commentInputs[activity.id]?.trim()}
                      className="px-3 py-1 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
