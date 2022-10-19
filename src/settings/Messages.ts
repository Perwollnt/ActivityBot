export class MessagesSettings {
    public static messagesSettings = {
        user: {
            is: {
                not: {
                    in: {
                        a: {
                            channel: "Kérlek csatlakozz egy hangcsatornához!"
                        }
                    }
                }
            }
        },
        commands: {
            activity: {
                message: "[A játék hozzáadva a szobádhoz](%link%). Katt a linkre, hogy játsz! (<#%channel.id%>)\n||*Nem minden játék fog minden szerveren működni. Ez a feature még béta*||",
                err: "Ismeretlen hiba történt, kérlek próbálj mást ||(DEBUG: %userping% :=: %errlog%)||"
            }
        },
    }
}