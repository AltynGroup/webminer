import { supabase } from "~/server/utils/supabase";

export default defineEventHandler(async (event) => {
    const body = await readBody(event); // Получаем данные из запроса

    if (!body.id || !body.username) {
        return { error: "Неполные данные" };
    }

    //console.log("📩 Получены данные Telegram:", body);

    // Проверяем, есть ли уже пользователь
    const { data: existingUser, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", body.id)
        .single();

    if (error) {
        console.error("Ошибка проверки пользователя:", error.message);
    }

    if (existingUser) {
        //console.log("✅ Пользователь уже есть в БД:", existingUser);
        return { success: true, user: existingUser };
    }

    // Если пользователя нет — добавляем
    const { data, error: insertError } = await supabase
        .from("users")
        .insert([
            {
                id: body.id,
                username: body.username,
                first_name: body.first_name,
                last_name: body.last_name || null,
                photo_url: body.photo_url || null,

            },
        ])
        .select()
        .single();

    if (insertError) {
      //  console.error("Ошибка добавления в БД:", insertError.message);
        return { error: "Не удалось сохранить пользователя" };
    }

    //console.log("🎉 Пользователь добавлен в БД:", data);
    return { success: true, user: data };
});