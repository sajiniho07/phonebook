package com.phonebook.helper;

import com.phonebook.dao.UserOwnerDao;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.ThreadContext;
import org.bson.types.ObjectId;

import java.util.HashMap;

public class CommonLogger {

    public static void log(Logger logger, Level level, Object... messages) {
        log(3, logger, level, messages);
    }

    private static void log(int doaMethodIndex, Logger logger, Level level, Object... messages) {
        if (logger.isEnabled(level)) {
            HashMap<String, String> detailMap = new HashMap<>();
            final StackTraceElement[] ste = Thread.currentThread().getStackTrace();
            detailMap.put("MethodName", ste[doaMethodIndex].getMethodName());
            ObjectId currentUserId = UserOwnerDao.getCurrentUserId();
            String userId = currentUserId == null ? "" : currentUserId.toString();
            detailMap.put("UserId", userId);
            StringBuilder sb = new StringBuilder();
            for (int index = 0; index < messages.length; index++) {
                Object msg = messages[index];
                if (msg != null) {
                    if (msg instanceof StackTraceElement) {
                        sb.append("StackTrace: " + msg.toString());
                    } else {
                        sb.append(msg.toString());
                    }
                }
            }
            ThreadContext.putAll(detailMap);
            logger.log(level, sb);
            ThreadContext.removeAll(detailMap.keySet());
        }
    }

}
