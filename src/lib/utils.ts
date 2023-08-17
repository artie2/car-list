

    //for this tasl we use only localstorage so we need to comppress image to save it in local storage
    export async function compressImage(file: File) {
        const img = document.createElement('img');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        img.src = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && typeof event.target.result === 'string') {
                    resolve(event.target.result);
                } else {
                    reject(new Error('Failed to load the image file.'));
                }
            };
            reader.readAsDataURL(file);
        });
        
        await img.decode(); 
        const MAX_WIDTH = 400; 
        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;
        
        if(ctx)ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/jpeg', 0.8);
    }
