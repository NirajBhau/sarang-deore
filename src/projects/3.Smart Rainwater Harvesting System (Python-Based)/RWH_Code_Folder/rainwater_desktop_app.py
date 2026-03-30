import tkinter as tk
from tkinter import ttk, messagebox
from PIL import Image, ImageTk, ImageFilter
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import random
import threading
import serial
import datetime

# Dummy serial port simulation (replace with actual serial.Serial if needed)
class FakeSerial:
    def readline(self):
        rainfall = round(random.uniform(0, 100), 2)
        tank_level = round(random.uniform(0, 100), 2)
        soil_moisture = round(random.uniform(0, 100), 2)
        return f"{rainfall},{tank_level},{soil_moisture}\n".encode('utf-8')

# Initialize serial connection (or simulated for demo)
# ser = serial.Serial('COM3', 9600)  # Use this for real sensor
ser = FakeSerial()  # For testing without hardware

# Manual data entries
manual_entries = []
mode = 'sensor'  # Default mode

def forecast_weather(rainfall):
    return "Rain likely tomorrow" if rainfall > 50 else "No rain expected"

def control_action(tank_level):
    return "Storing rainwater" if tank_level < 75 else "Redirecting to overflow"

class SmartRWHApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Smart Rainwater Harvesting System")
        self.root.geometry("1200x700")
        self.root.configure(bg='black')
        self.root.minsize(800, 600)

        # Load and blur background image
        self.bg_img = Image.open("background.jpg")
        self.bg_img = self.bg_img.filter(ImageFilter.GaussianBlur(8))
        self.bg_tk_img = ImageTk.PhotoImage(self.bg_img.resize((1200, 700)))
        self.bg_label = tk.Label(root, image=self.bg_tk_img)
        self.bg_label.place(x=0, y=0, relwidth=1, relheight=1)

        self.container = tk.Frame(root, bg='black')
        self.container.pack(expand=True, fill='both', padx=20, pady=20)

        # Top frame with readings
        self.readings_frame = tk.Frame(self.container, bg='black')
        self.readings_frame.pack(fill='x')

        self.labels = {}
        for text in ["Rainfall", "Tank Level", "Soil Moisture", "Control Action", "Forecast"]:
            self.labels[text] = tk.Label(self.readings_frame, text=f"{text}: ", font=("Segoe UI", 16, "bold"), fg="white", bg="black")
            self.labels[text].pack(anchor='w')

        # Mode switch
        self.mode_frame = tk.Frame(self.container, bg='black')
        self.mode_frame.pack(pady=10)
        self.mode_label = tk.Label(self.mode_frame, text="Mode:", font=("Segoe UI", 14), fg="white", bg="black")
        self.mode_label.pack(side='left')

        self.mode_var = tk.StringVar(value='sensor')
        self.sensor_radio = ttk.Radiobutton(self.mode_frame, text="Real-Time Sensor", variable=self.mode_var, value='sensor', command=self.toggle_mode)
        self.manual_radio = ttk.Radiobutton(self.mode_frame, text="Manual Entry", variable=self.mode_var, value='manual', command=self.toggle_mode)
        self.sensor_radio.pack(side='left', padx=10)
        self.manual_radio.pack(side='left', padx=10)

        self.manual_button = ttk.Button(self.mode_frame, text="Enter Manual Data", command=self.open_manual_popup)
        self.manual_button.pack(side='left')

        # Chart area
        self.fig, self.ax = plt.subplots(figsize=(6, 3), dpi=100)
        self.canvas = FigureCanvasTkAgg(self.fig, master=self.container)
        self.canvas.get_tk_widget().pack(fill='both', expand=True)

        self.data = []
        self.update_data()
        self.auto_refresh()

        self.root.bind('<Configure>', self.on_resize)

    def on_resize(self, event):
        new_bg = self.bg_img.resize((event.width, event.height))
        self.bg_tk_img = ImageTk.PhotoImage(new_bg)
        self.bg_label.configure(image=self.bg_tk_img)

    def toggle_mode(self):
        global mode
        mode = self.mode_var.get()

    def open_manual_popup(self):
        popup = tk.Toplevel()
        popup.title("Manual Data Entry")
        popup.geometry("400x400")

        entry_frame = tk.Frame(popup)
        entry_frame.pack(pady=10)

        tk.Label(entry_frame, text="Enter up to 8 Records").grid(row=0, column=0, columnspan=3)
        labels = ["Rainfall (mm)", "Tank Level (%)", "Soil Moisture (%)"]
        for idx, text in enumerate(labels):
            tk.Label(entry_frame, text=text).grid(row=1, column=idx)

        entries = []
        for i in range(8):
            row = []
            for j in range(3):
                e = tk.Entry(entry_frame, width=10)
                e.grid(row=i + 2, column=j)
                row.append(e)
            entries.append(row)

        def save_entries():
            global manual_entries
            manual_entries.clear()
            for row in entries:
                try:
                    data_row = tuple(float(e.get()) for e in row)
                    if len(data_row) == 3:
                        manual_entries.append(data_row)
                except:
                    continue
            popup.destroy()
            self.update_graph(manual_entries)

        submit_btn = ttk.Button(popup, text="Submit", command=save_entries)
        submit_btn.pack(pady=10)

    def auto_refresh(self):
        self.update_data()
        self.root.after(30000, self.auto_refresh)

    def update_data(self):
        global manual_entries, mode
        if mode == 'sensor':
            line = ser.readline().decode('utf-8').strip()
            try:
                rainfall, tank_level, soil_moisture = map(float, line.split(','))
                self.data.append((rainfall, tank_level, soil_moisture))
                if len(self.data) > 10:
                    self.data.pop(0)
                self.display_data(rainfall, tank_level, soil_moisture)
                self.update_graph(self.data)
            except:
                pass
        elif mode == 'manual' and manual_entries:
            last = manual_entries[-1]
            self.display_data(*last)
            self.update_graph(manual_entries)

    def display_data(self, rainfall, tank_level, soil_moisture):
        self.labels["Rainfall"].config(text=f"Rainfall: {rainfall:.2f} mm")
        self.labels["Tank Level"].config(text=f"Tank Level: {tank_level:.2f}%")
        self.labels["Soil Moisture"].config(text=f"Soil Moisture: {soil_moisture:.2f}%")
        self.labels["Control Action"].config(text=f"Control Action: {control_action(tank_level)}")
        self.labels["Forecast"].config(text=f"Forecast: {forecast_weather(rainfall)}")

    def update_graph(self, data_list):
        self.ax.clear()
        if not data_list:
            return
        rainfall = [d[0] for d in data_list]
        tank = [d[1] for d in data_list]
        x = list(range(1, len(rainfall) + 1))
        self.ax.plot(x, rainfall, label='Rainfall (mm)', color='cyan')
        self.ax.plot(x, tank, label='Tank Level (%)', color='lime')
        self.ax.set_title("Rainfall & Tank Level")
        self.ax.set_ylabel("Values")
        self.ax.set_xlabel("Entry #")
        self.ax.legend()
        self.ax.grid(True)
        self.canvas.draw()

if __name__ == '__main__':
    root = tk.Tk()
    app = SmartRWHApp(root)
    root.mainloop()
