import { format, isToday, isYesterday, isWithinInterval, subDays, getDay } from 'date-fns';
import { MessageItem } from './types';

interface CategorizedMessages {
  [key: string]: MessageItem[];
}

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function categorizeMessagesByDay(messages: MessageItem[]): CategorizedMessages {
  const categorizedMessages: CategorizedMessages = {};

  const addToCategory = (key: string, message: MessageItem) => {
    if (!categorizedMessages[key]) {
      categorizedMessages[key] = [];
    }
    categorizedMessages[key].push(message);
  };

  messages.forEach((message) => {
    const messageDate = new Date(message.createdAt);

    if (isToday(messageDate)) {
      addToCategory('Today', message);
    } else if (isYesterday(messageDate)) {
      addToCategory('Yesterday', message);
    } else if (isWithinInterval(messageDate, { start: subDays(new Date(), 6), end: new Date() })) {
      const dayName = dayNames[getDay(messageDate)];
      addToCategory(dayName, message);
    } else {
      const formattedDate = format(messageDate, 'MMMM d, yyyy');
      addToCategory(formattedDate, message);
    }
  });

  return categorizedMessages;
}




export default function getTime(time: string){
    return new Date(time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
}
