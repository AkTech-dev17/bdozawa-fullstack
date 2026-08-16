<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Item;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Ensure the verified hub user exists
        $hubUser = User::firstOrCreate(
            ['email' => 'security@tiu.edu.iq'],
            [
                'name' => 'TIU Security Desk',
                'password' => bcrypt('password'),
                'is_verified_hub' => true,
            ]
        );

        $items = [
            // 1. Electronics
            ['title' => 'iPhone 15 Pro Max', 'description' => 'Lost near cafeteria, black case.', 'type' => 'Lost', 'category' => 'Electronics', 'location' => 'TIU Campus'],
            ['title' => 'AirPods Pro Charging Case', 'description' => 'Found on library desk.', 'type' => 'Found', 'category' => 'Electronics', 'location' => 'Library'],
            ['title' => 'Dell XPS 13 Laptop', 'description' => 'Silver laptop left in amphitheater.', 'type' => 'Lost', 'category' => 'Electronics', 'location' => 'Engineering Building'],

            // 2. Wallets & Cards
            ['title' => 'Black Leather Wallet', 'description' => 'Contains cash and university ID.', 'type' => 'Lost', 'category' => 'Wallets & Cards', 'location' => 'Cafeteria'],
            ['title' => 'Brown Card Holder', 'description' => 'Found with multiple bank cards.', 'type' => 'Found', 'category' => 'Wallets & Cards', 'location' => 'Main Gate'],
            ['title' => 'Tommy Hilfiger Wallet', 'description' => 'Navy blue wallet lost during event.', 'type' => 'Lost', 'category' => 'Wallets & Cards', 'location' => 'Conference Hall'],

            // 3. Keys
            ['title' => 'Toyota Car Keys', 'description' => 'Key fob with a red leather strap.', 'type' => 'Found', 'category' => 'Keys', 'location' => 'Parking Lot B'],
            ['title' => 'House Keys with Blue Tag', 'description' => 'Bunch of 3 keys on a ring.', 'type' => 'Lost', 'category' => 'Keys', 'location' => 'Computer Dept'],
            ['title' => 'Office Master Key', 'description' => 'Found labeled with room number.', 'type' => 'Found', 'category' => 'Keys', 'location' => 'Administration Building'],

            // 4. Bags & Luggage
            ['title' => 'Nike Black Backpack', 'description' => 'Contains textbooks and notebooks.', 'type' => 'Lost', 'category' => 'Bags & Luggage', 'location' => 'Bus Stop'],
            ['title' => 'Grey Laptop Sleeve', 'description' => 'Found containing a charger and mouse.', 'type' => 'Found', 'category' => 'Bags & Luggage', 'location' => 'Study Hall'],
            ['title' => 'Samsonite Travel Duffle', 'description' => 'Dark blue gym bag left behind.', 'type' => 'Lost', 'category' => 'Bags & Luggage', 'location' => 'Sports Complex'],

            // 5. Jewelry
            ['title' => 'Gold Wedding Band', 'description' => 'Engraved ring lost near fountain.', 'type' => 'Lost', 'category' => 'Jewelry', 'location' => 'Campus Garden'],
            ['title' => 'Silver Wristwatch', 'description' => 'Casio vintage watch found on bench.', 'type' => 'Found', 'category' => 'Jewelry', 'location' => 'Courtyard'],
            ['title' => 'Diamond Stud Earring', 'description' => 'Single earring lost during classes.', 'type' => 'Lost', 'category' => 'Jewelry', 'location' => 'Science Building'],

            // 6. Documents
            ['title' => 'Batch of 5 Student IDs', 'description' => 'Collected from various campus areas.', 'type' => 'Found', 'category' => 'Documents', 'location' => 'Security Desk'],
            ['title' => 'National Identity Passport', 'description' => 'Lost passport folder.', 'type' => 'Lost', 'category' => 'Documents', 'location' => 'Main Street'],
            ['title' => 'Driving License', 'description' => 'Found on administrative desk.', 'type' => 'Found', 'category' => 'Documents', 'location' => 'Registrar Office'],

            // 7. Pets
            ['title' => 'White Persian Cat', 'description' => 'Blue eyes, answers to snow.', 'type' => 'Lost', 'category' => 'Pets', 'location' => 'Residential Area'],
            ['title' => 'Golden Retriever Puppy', 'description' => 'Found wearing a red collar.', 'type' => 'Found', 'category' => 'Pets', 'location' => 'Park Gate'],
            ['title' => 'Grey Parrot', 'description' => 'African grey bird escaped cage.', 'type' => 'Lost', 'category' => 'Pets', 'location' => 'Backyard Garden'],

            // 8. Clothing
            ['title' => 'North Face Winter Jacket', 'description' => 'Black jacket left in lecture hall.', 'type' => 'Found', 'category' => 'Clothing', 'location' => 'Auditorium'],
            ['title' => 'University Hoodie', 'description' => 'Grey hoodie with department logo.', 'type' => 'Lost', 'category' => 'Clothing', 'location' => 'Gymnasium'],
            ['title' => 'Cashmere Scarf', 'description' => 'Beige patterned winter scarf.', 'type' => 'Found', 'category' => 'Clothing', 'location' => 'Cafeteria Lobby'],

            // 9. Accessories
            ['title' => 'Ray-Ban Sunglasses', 'description' => 'Aviator glasses in black case.', 'type' => 'Lost', 'category' => 'Accessories', 'location' => 'Sports Field'],
            ['title' => 'Automatic Umbrella', 'description' => 'Navy blue windproof umbrella.', 'type' => 'Found', 'category' => 'Accessories', 'location' => 'Library Entrance'],
            ['title' => 'Hermes Silk Tie', 'description' => 'Red patterned formal necktie.', 'type' => 'Lost', 'category' => 'Accessories', 'location' => 'Conference Center'],

            // 10. Other
            ['title' => 'Textbook: Advanced PHP', 'description' => 'Spinal binding with personal notes.', 'type' => 'Found', 'category' => 'Other', 'location' => 'Lab 3'],
            ['title' => 'Hydro Flask Water Bottle', 'description' => 'Olive green flask with stickers.', 'type' => 'Lost', 'category' => 'Other', 'location' => 'Cafeteria'],
            ['title' => 'Art Sketchbook', 'description' => 'Spiral bound book filled with pencil drawings.', 'type' => 'Found', 'category' => 'Other', 'location' => 'Design Studio']
        ];

        foreach ($items as $itemData) {
            Item::create(array_merge($itemData, [
                'user_id' => $hubUser->id,
                'views' => rand(5, 50),
            ]));
        }
    }
}