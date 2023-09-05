const express = require("express");
const router = express.Router();
const db = require("../utils/database");

router.get("/", async (req, res) => {
    try {
        let data = await db.execute("SELECT * FROM users");
        let [row] = data;
        res.json({
            users: row,
        });
    } catch (error) {
        res.json({
            message: "Get all users",
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let data = await db.execute(`SELECT * FROM users WHERE id_users = ?`, [
            id,
        ]);
        let row = data[0];
        if (row.length === 0) {
            res.json({
                message: "User with id is not defind",
            });
        } else {
            res.json(row[0]);
        }
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        let { name, description } = req.body;
        let data = await db.execute(
            `INSERT INTO users(name, description) VALUE(?, ?)`,
            [name, description]
        );
        res.json({
            message: "hello",
        });
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

router.put("/:id", async (req, res) => {
    let { id } = req.params;
    let { name, description } = req.body;
    try {
        let data = await db.execute(`SELECT * FROM users WHERE id_users = ?`, [
            id,
        ]);
        let row = data[0];
        if (row.length === 0) {
            res.json({
                message: "Không tìm thấy người dùng để cập nhật",
            });
        } else {
            await db.execute(
                `UPDATE users SET name = ?, description = ? WHERE id_users = ?`,
                [name || row[0].name, description || row[0].description, id]
            );

            res.json({
                message: "Cập nhật người dùng thành công",
            });
        }
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute("DELETE FROM users WHERE id_users = ?", [id]);
        let data = await db.execute("SELECT * FROM users");
        res.json({
            message: "Đã delete thành công",
            user: data[0],
        });
    } catch (error) {
        res.json({
            message: "Delete one users",
        });
    }
});

module.exports = router;
