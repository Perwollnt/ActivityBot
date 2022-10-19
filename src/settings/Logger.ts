export class LoggerSettings {
    public static systemsettings = {
        logmessage: "$%type% $%message% | %sender% => lvl %level%", // $ = color char || %type% = SYSTEM | EVENT | ERROR || %level% = 0, 1, 2, 3, 4 || %message% = message, %sender% = the code snippet that sent the log
        logSettings: {
            levelcolor: {
                // [!!] http://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html [!!]
                0: "\u001b[37m", //white
                1: "\u001b[32m", //green
                2: "\u001b[33m", //yellow
                3: "\u001b[35m", //magenta
                4: "\u001b[31m" //red
            },
            types: {
                SYSTEM: "\u001b[2;30m[\u001b[0m\u001b[2;33mSYS\u001b[0m\u001b[2;30m]\u001b[0m",
                EVENT: "\u001b[2;30m[\u001b[0m\u001b[2;33m\u001b[2;32mEVENT\u001b[0m\u001b[2;33m\u001b[0m\u001b[2;30m]\u001b[0m",
                ERROR: "\u001b[2;30m[\u001b[0m\u001b[2;31mERR\u001b[0m\u001b[2;30m]\u001b[0m",
            }
        },
    }
}