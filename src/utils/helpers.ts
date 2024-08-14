import { format, isToday, isYesterday, isWithinInterval, subDays, getDay } from 'date-fns';
import { Message} from './types';

interface CategorizedMessages {
  [key: string]: Message[];
}

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function categorizeMessagesByDay(messages: Message[]): CategorizedMessages {
  const categorizedMessages: CategorizedMessages = {};

  const addToCategory = (key: string, message: Message) => {
    if (!categorizedMessages[key]) {
      categorizedMessages[key] = [];
    }
    categorizedMessages[key].push(message);
  };


  messages.forEach((message) => {
    const messageDate = new Date(message?.updatedAt ?? message?.createdAt);


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




export function getTime(time: string ){
    return new Date(time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
}


export function getInitials(name: string): string {
  // Split the name into words
  const words = name.split(' ');
  const initials = words?.[0]?.[0] + words?.[1]?.[0];
  return initials.toUpperCase();
}
